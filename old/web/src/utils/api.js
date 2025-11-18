// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-lambda-url.execute-api.us-east-1.amazonaws.com/prod';

/**
 * Fetch today's weather for a location
 * @param {string} latitude - Latitude
 * @param {string} longitude - Longitude
 * @returns {Promise} Weather data with today and last year comparison
 */
export const fetchTodayWeather = async (latitude, longitude) => {
    try {
        const response = await fetch(`${API_BASE_URL}/weather/today?latitude=${latitude}&longitude=${longitude}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching today weather:', error);
        throw error;
    }
};

/**
 * Fetch list of available locations
 * @returns {Promise} Array of locations
 */
export const fetchLocations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/weather/locations`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};

/**
 * Fetch past weather data
 * @param {string} latitude - Latitude
 * @param {string} longitude - Longitude
 * @param {string} date - Optional date filter (YYYY-MM-DD)
 * @returns {Promise} Past weather data
 */
export const fetchPastWeather = async (latitude, longitude, date = null) => {
    try {
        let url = `${API_BASE_URL}/weather/past?latitude=${latitude}&longitude=${longitude}`;
        if (date) {
            url += `&date=${date}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching past weather:', error);
        throw error;
    }
};

/**
 * Fetch yearly weather summary
 * @param {string} latitude - Latitude
 * @param {string} longitude - Longitude
 * @param {number} year - Optional year (defaults to last year)
 * @returns {Promise} Yearly weather summary
 */
export const fetchYearlyWeather = async (latitude, longitude, year = null) => {
    try {
        let url = `${API_BASE_URL}/weather/past/year?latitude=${latitude}&longitude=${longitude}`;
        if (year) {
            url += `&year=${year}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching yearly weather:', error);
        throw error;
    }
};

