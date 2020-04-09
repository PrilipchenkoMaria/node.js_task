const csv = require('fast-csv');

async function formatCsv(users) {
  const csvStream = csv.format({ headers: true });
  return users.pipe(csvStream);
}

async function parseCsv(data) {
  return new Promise((resolve, reject) => {
    const rows = [];
    const stream = csv.parse({ headers: true })
      .on('error', reject)
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve(rows));
    stream.write(data);
    stream.end();
  });
}

module.exports = {
  parseCsv,
  formatCsv,
};
