const path = require('path');

const settings = {
  TOTAL_RECORDS: 1e7, // this is 10 million
  BATCH_SIZE: 1000,
  FILE_NAME: 'data.csv',
  DESTINATION_DIR: path.join(__dirname, 'data'),
  NUMBER_OF_FILES: 4,
  LOG_RATE: 1e6,
};


module.exports = settings;
