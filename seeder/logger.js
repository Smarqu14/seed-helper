const { TOTAL_RECORDS, LOG_RATE } = require('./config');

class Logger {
  constructor(type) {
    this.startTime = process.hrtime();
    this.lastLogTime = process.hrtime();
    this.type = type;
  }

  log(currentId) {
    const recordsRemaining = TOTAL_RECORDS - currentId;
    const secondsSinceLastLog = process.hrtime(this.lastLogTime)[0];
    const totalSeconds = process.hrtime(this.startTime)[0];
    const logsRemaining = recordsRemaining / LOG_RATE;

    this.lastLogTime = process.hrtime();

    // const logsRemaining = recordsRemaining / LOG_RATE;
    const estimatedMinutesRemaining = (secondsSinceLastLog * logsRemaining) / 60;
    console.log(`${this.type} RECORDS INSERTED: ${currentId}/${TOTAL_RECORDS}`);
    console.log(`TIME SINCE LAST LOG (sec): ${secondsSinceLastLog}`);
    console.log(`ESTIMATED TIME REMAINING (mins): ${estimatedMinutesRemaining}`);
    console.log(`TOTAL TIME (mins): ${totalSeconds / 60}\n`);
  }
}

module.exports = Logger;
