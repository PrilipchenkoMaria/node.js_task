const { parseCsv, formatCsv } = require('../services/csv');

async function uploadUsersFromCsv(req, res) {
  const db = req.app.get('db');
  if (!req.files || !req.files.users) {
    throw Error('No files were uploaded.');
  }
  const { data: file } = req.files.users;
  const users = await parseCsv(file);
  await db.collection('users').insertMany(users);
  res.sendStatus(201);
}

async function getUsersAsCsv(req, res) {
  const db = req.app.get('db');
  res.setHeader('Content-disposition', 'attachment; filename=users.csv');
  const users = db.collection('users').find().project({ _id: 0 }).stream();
  const csv = await formatCsv(users);
  csv.pipe(res);
}

async function getUsersAsJson(req, res) {
  const db = req.app.get('db');
  const users = await db.collection('users').find().project({ _id: 0 }).toArray();
  res.json(users);
}

module.exports = {
  uploadUsersFromCsv,
  getUsersAsCsv,
  getUsersAsJson,
};
