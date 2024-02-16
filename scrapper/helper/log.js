const fs = require('fs');


/**
 * Get the browser and page.
 * 
 * @param {object} params - The browser params.
 * 
 * @since v1.0.0
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {object} - The browser.
 */
const logger = {
    /**
     * Log a message at the LOG level.
     * 
     * @param {...string} messages - The messages to log.
     */
    log: (...messages) => logger._write('LOG', ...messages),

    /**
     * Log a message at the INFO level.
     * 
     * @param {...string} messages - The messages to log.
     */
    info: (...messages) => logger._write('INFO', ...messages),

    /**
     * Log a message at the WARN level.
     * 
     * @param {...string} messages - The messages to log.
     */
    warn: (...messages) => logger._write('WARN', ...messages),

    /**
     * Log a message at the ERROR level.
     * 
     * @param {...string} messages - The messages to log.
     */
    error: (...messages) => logger._write('ERROR', ...messages),

    /**
     * Write a log message to the console and the log file.
     * 
     * @private
     * @param {string} level - The log level.
     * @param {...string} messages - The messages to log.
     */
    _write: (level, ...messages) => {
        const timestamp = new Date().toISOString();
        let logMessage = `${timestamp} [${level}] ${messages.join(' ')}\n`;

        switch(level) {
            case 'INFO':
                console.info(logMessage);
                break;
            case 'WARN':
                console.warn(logMessage);
                break;
            case 'ERROR':
                console.error(logMessage);
                break;
            default:
                console.log(logMessage);
        }

        fs.appendFileSync('app.log', logMessage);
    }
}
module.exports = {
    logger
}
