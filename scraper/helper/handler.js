const {  getData } = require('../helper/scraper');
const { logger } = require('./log');

/**
 * Wrapper function to get data from the page and store it in the weatherData object.
 * @module helper/handler
 * 
 * @param {object} page - The page object.
 * @param {object} weatherData - The weather data object.
 * @param {string} selectorType - The type of selector.
 * @param {string} selector - The selector.
 * @param {string} key - The key.
 * @param {string} errorMsg - The error message.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns void
 */
async function getDataHandler(page, weatherData, selectorType, selector, key, errorMsg) {
    try {
        const data = await getData(page, selectorType, selector);
        weatherData[key] = data;
    } catch (err) {
        logger.error(errorMsg);
        logger.error(err.message);
    }
}

module.exports = {
    getDataHandler
}
