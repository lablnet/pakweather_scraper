const fs = require('fs');

/**
 * Get Latitude and Longitude from given URL.
 * 
 * @param {string} url - The URL.
 * 
 * @returns {Array} - The latitude and longitude.
 * 
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * @since v1.0.2
 */
const getLatLong = (url) => {
    const latlong = url.split("/")[6].split(",");
    return [latlong[0].trim(), latlong[1].replace("?unit=c", '').trim()];
}

/**
 * Get the datetime of GMT+5.
 * 
 * @returns {Date} - The date.
 * 
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * @since v1.0.2
 */
const getDatetime = () => {
    return new Date().toLocaleString("en-US", {timeZone: "Asia/Karachi"});
}  

module.exports = {
    getDatetime,
    getLatLong,
}
