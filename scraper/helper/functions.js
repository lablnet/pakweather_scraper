const fs = require('fs');

/**
 * Get Latitude and Longitude from given URL.
 * 
 * @param {string} url - The URL.
 * 
 * @returns {Array} - The latitude and longitude.
 * 
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * @since v1.0.0
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
 * @since v1.0.1
 */
const getDatetime = () => {
    return new Date().toLocaleString("en-US", {timeZone: "Asia/Karachi"});
}  

/**
 * File to set.
 * 
 * @param {string} fileName - The file name.
 * 
 * @returns {Set} - The set.
 * 
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * @since v1.0.0
 */
const fileToSet = (fileName) => {
    const fileData = fs.readFileSync(fileName, 'utf-8');
    const lines = fileData.split('\n');
    return new Set(lines);
}

/**
 * Set to file.
 * 
 * @param {Set} set - The set.
 * @param {string} fileName - The file name.
 * 
 * @returns {void}
 * 
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * @since v1.0.0
 */
const setToFile = (set, fileName) => {
    const data = [...set].join('\n');
    fs.writeFileSync(fileName, data);
}


module.exports = {
    getDatetime,
    fileToSet,
    setToFile,
    getLatLong,
}
