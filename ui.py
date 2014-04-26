#!/usr/bin/env python
import requests
from flask import Flask, request, jsonify
from flask_crossdomain import crossdomain

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

@app.route("/api/check", methods=["POST"])
@crossdomain(origin="*")
def check():
    texts = request.json['text']
    if not isinstance(texts, list):
        texts = [texts]

    checked = [_api_check(text) for text in texts]
    return jsonify({"checked": checked})

def _api_check(text):
    r = requests.get(BASE_URL, params={
        "language": "uk",
        "text": text})
    return r.text

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)
