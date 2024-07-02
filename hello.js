// functions/server.js
import express from 'express';
import serverless from 'serverless-http';
import fetch from 'node-fetch';

const app = express();
const WEATHER_API_KEY = '14864027ab841734362f62c4b6f5ea33';

// Middleware to extract client IP address from request
app.use((request, response, next) => {
    let clientIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    if (clientIp.startsWith('::ffff:')) {
        clientIp = clientIp.substring(7);
    }
    request.clientIp = clientIp;
    next();
});

app.get('/api/hello', async (request, response) => {
    try {
        const visitorName = request.query.visitor_name;
        const clientIp = request.clientIp;

        // Fetch IP geolocation data
        const ipApiResponse = await fetch(`https://ipapi.co/${clientIp}/json/`);
        const ipData = await ipApiResponse.json();
        const { latitude, longitude } = ipData;

        // Fetch weather data using coordinates
        const weatherApiResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`);
        const weatherData = await weatherApiResponse.json();
        const { name: location, main: { temp } } = weatherData;

        // Convert temperature from Kelvin to Celsius
        const temperatureCelsius = (temp - 273.15).toFixed(2);

        // Send the response as JSON
        response.json({
            clientIp: clientIp,
            location: location,
            greeting: `Hello, ${visitorName}! The temperature is ${temperatureCelsius} degrees Celsius in ${location}`
        });
    } catch (err) {
        console.error(err); // Log any errors to the console
        response.status(500).json({ error: 'Server error' }); // Send a 500 Internal Server Error response if something goes wrong
    }
});

export const handler = serverless(app);

