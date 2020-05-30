const fs = require('fs');
const path = require('path');
const { BATCH_SIZE, TOTAL_RECORDS, LOG_RATE, NUMBER_OF_FILES} = require('../config.js');
const toCSV = require('../transformers/toCSV');

function dataWriter(fileName, destinationDir, generator, logger) {
  const recordsPerFile = TOTAL_RECORDS / NUMBER_OF_FILES;
  let currentFileNum = 1;
  let writer = fs.createWriteStream(path.join(destinationDir, `${fileName}-${currentFileNum}.csv`));
  let currentId = 0;
  let batch = [];
  let lastLogId = 0;

  return new Promise((resolve, reject) => {
    writer.on('error', (err) => reject(err))

    function write() {
      let ok = true;

      do {
        batch = toCSV(generator(currentId));
        // process.exit();
        currentId += BATCH_SIZE;

        if (currentId === TOTAL_RECORDS) {
          // last batch!
          writer.write(batch, 'utf8', () => {
            logger.log(currentId);
            resolve();
          });
        } else if (currentId - lastLogId > LOG_RATE) {
          const logId = currentId
          ok = writer.write(batch, 'utf8', () => {
            logger.log(logId);
            lastLogId = logId;
          });
        } else {
          ok = writer.write(batch, 'utf8');
        }

          //   currentFileNum += 1;
          //   writer = fs.createWriteStream(path.join(destinationDir, `${fileName}-${currentFileNum}.csv`));
          // }
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