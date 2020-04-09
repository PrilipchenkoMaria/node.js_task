const { MongoClient } = require('mongodb');
const {dbConfig} = require('../../config');

let client;
let db;

async function connect() {
  if (client) return;
  client = await MongoClient.connect(dbConfig.mongo.url, { useUnifiedTopology: true });
  db = client.db(dbConfig.mongo.dbname);
}

function collection(collectionName) {
  if (!client) throw new Error('Client does not exist');
  return db.collection(collectionName);
}

module.exports = {
  connect,
  collection,
};
