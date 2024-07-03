#!/usr/bin/python3
"""
Flask application to return the user's IP address, location, and current weather conditions.
"""
from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()
WEATHER_API_KEY = os.getenv('WEATHER_API_KEY')


@app.route('/api/greet', methods=['GET'])
def greet_user():
    """
    Provides a JSON response containing the client's IP address,
    location, and weather information,
    along with a customized greeting message.

    URL:
        /api/greet

    Method:
        GET

    Parameters:
        visitor_name (string, required):
        The name of the visitor, supplied as a query parameter.

    Headers:
        X-Forwarded-For (string, optional):
        The client's IP address, usually set by a reverse proxy
        or load balancer. If absent,
        the server's IP address will be used.

    Response:
        JSON object with the following fields:
            - client_ip (string):
            The IP address of the client making the request.

            - location (string):
            The city where the client is located, based on the IP address.

            - greeting (string):
            A customized greeting message that includes the visitor's name
            and the current temperature in their city.

    Example Request:
        GET /api/greet?visitor_name=JaneDoe
    """
    visitor_name = request.args.get('visitor_name').strip('"')
    client_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    location_response = requests.get(f'http://ip-api.com/json/{client_ip}')
    location_data = location_response.json()
    city = location_data.get('city')

    if city:
        weather_response = requests.get(
            f'http://api.openweathermap.org/data/2.5/weather',
            params={'q': city, 'appid': WEATHER_API_KEY, 'units': 'metric'}
        )
        weather_data = weather_response.json()
        temperature = weather_data['main']['temp']
    else:
        city = 'Unknown'
        temperature = 'Unknown'

    greeting_message = f'Hello, {visitor_name}! The temperature is {temperature} degrees Celsius in {city}.'

    return jsonify({
        'client_ip': client_ip,
        'location': city,
        'greeting': greeting_message
    })


if __name__ == "__main__":
    app.run()
