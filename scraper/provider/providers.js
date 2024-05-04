const { weatherdotcom_crawler } = require('../crawler/weatherdotcom');

const providers = {
    "weather.com": weatherdotcom_crawler
}

module.exports = providers;
