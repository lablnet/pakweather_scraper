const express = require('express');
const awsServerlessExpress = require('aws-serverless-express');
const app = express();

app.get('/weather/today', (req, res) => {
    // Extract latitude and longitude from query parameters
    const { latitude, longitude } = req.query;
    // Implement logic to fetch today's weather
    res.json({ weather: 'Sunny', latitude, longitude });
});

app.get('/weather/locations', (req, res) => {
    // Return an array of locations
    res.json([{ location: 'Location1', lat: 10, long: 20 }]);
});

app.get('/weather/past', (req, res) => {
    const { latitude, longitude, date } = req.query;
    // Logic to fetch past weather
    res.json({ date, latitude, longitude, weather: 'Cloudy' });
});

app.get('/weather/past/year', (req, res) => {
    const { latitude, longitude } = req.query;
    // Logic to fetch yearly weather summary
    res.json({ latitude, longitude, summary: 'Typically warm' });
});

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
};
