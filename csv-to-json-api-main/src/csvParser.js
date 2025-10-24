const parseCsv = (csvContent) => {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');

  const jsonData = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      const value = values[j];
      const keys = header.split('.');
      let current = obj;
      for (let k = 0; k < keys.length - 1; k++) {
        if (!current[keys[k]]) {
          current[keys[k]] = {};
        }
        current = current[keys[k]];
      }
      current[keys[keys.length - 1]] = value;
    }
    jsonData.push(obj);
  }

  return jsonData;
};

module.exports = { parseCsv };
