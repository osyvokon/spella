#!/usr/bin/env python
import re
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

@app.route("/api/check", methods=["GET"])
def check_get():
    return "Only POST method supported"

@app.route("/api/check", methods=["POST", "OPTIONS"])
@crossdomain(origin="*", headers="*")
def check():

    if not request.json or 'text' not in request.json:
        abort(400, "json request with `text` field required")

    texts = request.json['text']
    if not isinstance(texts, list):
        texts = [texts]

    checked = [_api_check(text) for text in texts]
    return jsonify({"checked": checked})

def _api_check(text):
    # Replace html tags with spaces. The goal here is to skip tags from
    # being checked and preserve original offsets (that's why just
    # stripping tags is not enough)
    text = re.sub("<.*?>", lambda x: " " * len(x.group(0)), text)

    # Send request to LT API
    r = requests.get(BASE_URL, params={
        "language": "uk",
        "text": text,
        "disabled": "WHITESPACE_RULE"
        })
    return r.text

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)
