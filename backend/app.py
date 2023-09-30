from flask import Flask, request
from flask_cors import CORS
import requests
from urllib.parse import urlencode
from bs4 import BeautifulSoup
from transformers import pipeline
import os

API_URL = "https://api.metaphor.systems/"
API_KEY = os.environ["METAPHOR_KEY"]
app = Flask(__name__)

def search_query(query):
    payload = {"query": query}
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "x-api-key": API_KEY
    }
    response = requests.post(API_URL + "search", json=payload, headers=headers)
    return response.json()

def get_similar(url):
    payload = {"url": url}
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "x-api-key": API_KEY
    }
    response = requests.post(API_URL + "findSimilar", json=payload, headers=headers)
    return response.json()

def get_contents(ids):
    params = [("ids", id) for id in ids]
    url = f"{API_URL}contents?{urlencode(params)}"
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "x-api-key": API_KEY
    }
    response = requests.get(url, headers=headers)
    return response.json()

def get_text(html_content):
    soup = BeautifulSoup(html_content, "html.parser")

    # get text from html
    text_content = soup.get_text(separator=" ", strip=True)
    return str(text_content)

def summarize_text(text):
    summarizer = pipeline("summarization")
    summary = summarizer(text, max_length=150, min_length=40, do_sample=False)
    return summary

@app.route("/search", methods=["GET"])
def get():
    query = request.args.get("query")
    search_results = search_query(query)
    return search_results

@app.route("/similar", methods=["POST"])
def post():
    url = request.json["url"]
    similar_results = get_similar(url)
    return similar_results

@app.route("/summarize", methods=["POST"])
def summarize():
    ids = request.json["ids"]
    contents = get_contents(ids)
    html_text = get_text(contents["contents"][0]["extract"])

    return {
        "id": contents["contents"][0]["id"],
        "text": summarize_text(html_text)[0]["summary_text"]
    }

CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ == "__main__":
    app.run(debug=True)
