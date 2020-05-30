const path = require('path');

const settings = {
  TOTAL_RECORDS: 1e7, // this is 10 million
  BATCH_SIZE: 1000,
  FILE_NAME: 'demoData',
  DESTINATION_DIR: path.join(__dirname, 'data'),
  NUMBER_OF_FILES: 2,
  LOG_RATE: 1e6,
};

if (settings.TOTAL_RECORDS % settings.NUMBER_OF_FILES !== 0) {
  throw new Error('config.js: TOTAL_RECORDS must be perfectly divisible by NUMBER_OF_FILES');
}

if (settings.TOTAL_RECORDS % settings.BATCH_SIZE !== 0) {
  throw new Error('config.js: TOTAL_RECORDS must be perfectly divisible by BATCH_SIZE');
}

module.exports = settings;
