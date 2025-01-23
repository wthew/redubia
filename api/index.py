from flask import Flask, request
from api.redubia import Redubia, dublagemApiClient

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

    print(redubia.page.title)

    return {
        'title': redubia.page.title,
        'images': redubia.page.images, 
        'summary': redubia.page.summary,
        'table': redubia.table(),
        'content': redubia.page.content
    }

@app.route("/api/cover/<string:page_id>")
def get_cover(page_id: str):
    print('test:')

    size = request.args.get('size', 300)
    print(page_id, size)

    
    test = dublagemApiClient.cover_image(page_id, size)

    print(test)

    return test 


@app.route("/api/gallery/<string:page_id>")
def gallery(page_id: str):
    return dublagemApiClient.gallery(page_id)