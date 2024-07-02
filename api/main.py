#!/usr/bin/env pyhthon3
"""stage one"""

from flask import Flask, jsonify, request
import requests


class WeatherApp:
    def __init__(self):
        self.app = Flask(__name__)
        self.api_key = "b82801fd933a4a0aaf78ef1d82048722"
        self.weather_api_key = "cde973399f35f9cad81df7b715a40a45"
        self.app.add_url_rule('/', 'home', self.home_page)
        self.app.add_url_rule('/api/hello', 'greeting', self.greeting_route)

    def home_page(self):
        """
        Home page route that returns a welcome message and user agent string.
        """
        user_agent_response = requests.get(
            f'https://api.ipgeolocation.io/user-agent?apiKey={self.api_key}')
        user_agent_string = user_agent_response.json().get("userAgentString", "")
        return f"<h1>Welcome to the home page!<br>Your User Agent is {user_agent_string}</h1><p style='color: coral;'>Have a work around</p>"

    def greeting_route(self):
        """
        API endpoint that returns a greeting message along with the visitor's location and temperature.
        """
        visitor_name = request.args.get('visitor_name', default="Anonymous")
        ip_address = request.headers.get('X-Real-IP', '127.0.0.1')
        location_data = requests.get(f"https://ipapi.co/{ip_address}/json/").json()
        city = location_data.get("city", "Unknown")
        latitude = location_data.get("latitude", 0)
        longitude = location_data.get("longitude", 0)
        weather_response = requests.get(
            "https://api.openweathermap.org/data/2.5/weather",
            params={"lat": latitude, "lon": longitude, "appid": self.weather_api_key}
        ).json()
        temperature_celsius = round(int(weather_response["main"]["temp"]) - 273.15)
        response_message = {
            "client_ip": ip_address,
            "greeting": f"Hello {visitor_name}!, the temperature is {temperature_celsius} degrees Celsius in {city}",
            "location": city
        }
        return jsonify(response_message)

    def run(self):
        """
        Method to run the Flask application.
        """
        self.app.run(debug=True)

if __name__ == "__main__":
    weather_app = WeatherApp()
    weather_app.run()

