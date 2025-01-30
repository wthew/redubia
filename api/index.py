from flask import Flask, request
from flask_smorest import Api
from api.redubia import Redubia, dublagemApiClient
from routes import register_routes

app = Flask(__name__)
app.config["API_TITLE"] = "Redub.ia API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.2"
app.config["OPENAPI_JSON_PATH"] = "swagger.json"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_REDOC_PATH"] = "/redoc"
app.config["OPENAPI_REDOC_URL"] = "https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"

api = Api(app)
register_routes(api)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/page/<string:page_id>")
def page_by_id(page_id: str):
    redubia = Redubia(page_id)

    print(redubia.page.title)

    return {
        'title': redubia.page.title,
        'images': redubia.page.images, 
        'summary': redubia.page.summary,
        'table': redubia.table(),
        'content': redubia.page.content,
        'cover': dublagemApiClient.cover_image(page_id)
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
    size = request.args.get('size', None)
    return dublagemApiClient.gallery(page_id, size)