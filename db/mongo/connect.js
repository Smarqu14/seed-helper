const { MongoClient } = require('mongodb');

const mongoUrl = process.env.DB_URL || 'mongodb://localhost:27017';
const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

function connectToDb(databaseName) { // STUDENT
  return new Promise((resolve, reject) => {
    console.log('Mongo url', mongoUrl);
    client.connect((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Mongo Connection established!');
        resolve(client.db(databaseName));
      }
    });
  });
}

module.exports = { dbClient: client, dbConnect: connectToDb('seedDemo') };
