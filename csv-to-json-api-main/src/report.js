const { pool } = require('./database');

const generateReport = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT age FROM public.users');
    const ages = result.rows.map(row => row.age);

    const ageGroups = {
      '< 20': 0,
      '20 to 40': 0,
      '40 to 60': 0,
      '> 60': 0,
    };

    for (const age of ages) {
      if (age < 20) {
        ageGroups['< 20']++;
      } else if (age >= 20 && age <= 40) {
        ageGroups['20 to 40']++;
      } else if (age > 40 && age <= 60) {
        ageGroups['40 to 60']++;
      } else {
        ageGroups['> 60']++;
      }
    }

    const total = ages.length;
    const report = {
      'Age-Group': '% Distribution',
      '< 20': (ageGroups['< 20'] / total) * 100,
      '20 to 40': (ageGroups['20 to 40'] / total) * 100,
      '40 to 60': (ageGroups['40 to 60'] / total) * 100,
      '> 60': (ageGroups['> 60'] / total) * 100,
    };

    return report;
  } finally {
    client.release();
  }
};

module.exports = { generateReport };
