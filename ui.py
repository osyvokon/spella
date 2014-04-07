#!/usr/bin/env python
import requests
from flask import Flask, request

BASE_URL = 'http://localhost:8081'

app = Flask(__name__, static_url_path='')

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route("/proxy", methods=['GET'])
def proxy():
    text = request.args.get("text")
    r = requests.get(BASE_URL, params={
        "language": "uk",
        "text": text})
    return r.text


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)
