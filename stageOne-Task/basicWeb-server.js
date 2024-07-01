import express, { request, response } from 'express';
import requestIp from 'request-ip';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestIp.mw());

/**
 * @api {get} /api/hello Get greeting message
 * @apiName GetGreeting
 * @apiGroup Greeting
 *
 * @apiParam {String} visitor_name Visitor's name.
 *
 * @apiSuccess {String} clientIp The IP address of the requester.
 * @apiSuccess {String} location The city of the requester.
 * @apiSuccess {String} greeting Greeting message including the visitor's name and temperature.
 *
 * @apiError ServerError Server error message.
 */
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
