const { dbConnect } = require('./connect');
let collection;

dbConnect.then((db) => {
  collection = db.collection('demoCollection') //STUDENT
});

function bulkInsert(records) {
  return new Promise((resolve, reject) => {
    collection.insertMany(records, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

module.exports = bulkInsert;