const db = require('./connect');
const collection = db.collection('demoCollection'); // STUDENT

function bulkInsert(records) {
  new Promise((resolve, reject) => {
    collection.insertMany(records, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

module.exports = bulkInsert;