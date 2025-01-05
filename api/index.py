from flask import Flask
from api.redubia import Redubia

app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/search/<string:query>")
def search(query: str):
    return Redubia.search(query)

@app.route("/api/page/<string:page_id>")
def page_by_id(page_id: str):
    redubia = Redubia(page_id)

    return {
        'images': redubia.page.images, 
        'summary': redubia.page.summary,
        'table': redubia.table(),
    }