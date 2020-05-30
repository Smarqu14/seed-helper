const generateRecords = require('./recordGenerators/generateRecords');
const writer = require('./writers/fileWriter');
const Logger = require('./logger');
const { FILE_NAME, DESTINATION_DIR } = require('./config');

const logger = new Logger('demo record');
const startFileNum = 1;

writer(FILE_NAME, startFileNum, DESTINATION_DIR, generateRecords, logger)
  .then(() => console.log('DONE!!!'))
  .catch((err) => console.log(err))
