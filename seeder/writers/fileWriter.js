const fs = require('fs');
const path = require('path');
const { BATCH_SIZE, TOTAL_RECORDS, LOG_RATE} = require('../config.js');
const toCSV = require('../transformers/toCSV');


function dataWriter(fileName, destinationDir, generator, logger) {
  let writer = fs.createWriteStream(path.join(destinationDir, fileName));
  let currentId = 1;
  let batch;
  let lastLog = 1;

  return new Promise((resolve, reject) => {
    writer.on('error', (err) => reject(err))

    function write() {
      let ok = true;

      do {
        batch = toCSV(generator(currentId));
        currentId += BATCH_SIZE;

        if (currentId === TOTAL_RECORDS) {
          // last batch!
          logger.log(currentId);
          writer.write(batch, 'utf8', onCompletionCallback);
        } else {
          if (currentId - lastLog > LOG_RATE) {
            logger.log(currentId);
            lastLog = currentId;
          }
          ok = writer.write(batch, 'utf8');
        }
      } while (currentId < TOTAL_RECORDS && ok);
      if (currentId < TOTAL_RECORDS) {
        // Had to stop early!
        // Write some more once it drains.
        writer.once('drain', write);
      } else {
        resolve();
      }
    }

    write();

  });
}

module.exports = dataWriter;