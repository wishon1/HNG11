import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use((request, response, next) => {
    request.clientIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    next();
});

app.get('/api/hello', async (request, response) => {
    try {
        const visitorName = request.query.visitor_name;
        const clientIp = request.clientIp;

        const location = "New York";
        const temp = 11;

        const responseObj = {
            clientIp: clientIp,
            location: location,
            greeting: `Hello, ${visitorName}! The temperature is ${temp} degrees Celsius in ${location}`
        };

        response.json(responseObj);
    } catch (err) {
        console.error(err);
        response.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
