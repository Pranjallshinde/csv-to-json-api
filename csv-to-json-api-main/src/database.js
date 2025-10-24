const { Pool } = require('pg');

const pool = new Pool();

const insertData = async (jsonData) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const record of jsonData) {
      const { name, age, ...rest } = record;
      const fullName = `${name.firstName} ${name.lastName}`;
      const address = rest.address || {};
      delete rest.address;
      const additional_info = rest;

      const query = {
        text: 'INSERT INTO public.users(name, age, address, additional_info) VALUES($1, $2, $3, $4)',
        values: [fullName, age, address, additional_info],
      };
      await client.query(query);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { insertData, pool };
