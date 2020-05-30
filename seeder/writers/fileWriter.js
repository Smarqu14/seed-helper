const fs = require('fs');
const path = require('path');
const { BATCH_SIZE, TOTAL_RECORDS, LOG_RATE} = require('../config.js');
const toCSV = require('../transformers/toCSV');


function dataWriter(fileName, destinationDir, generator, logger) {
  let writer = fs.createWriteStream(path.join(destinationDir, fileName));
  let currentId = 0;
  let batch = [];
  let lastLogId = 0;

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
          writer.write(batch, 'utf8', resolve());
        } else {
          if (currentId - lastLogId > LOG_RATE) {
            logger.log(currentId);
            lastLogId = currentId;
          }
          ok = writer.write(batch, 'utf8');
        }

        // if
      } while (currentId < TOTAL_RECORDS && ok);

      if (currentId < TOTAL_RECORDS) {
        // Had to stop early!
        // Write some more once it drains.
        writer.once('drain', write);
      }
    }

    write();

  });
}

module.exports = dataWriter;