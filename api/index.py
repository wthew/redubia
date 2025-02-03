from flask import Flask, request
from flask_smorest import Api
from api.redubia import Redubia, dublagemApiClient
from api.routes import register_routes
from flask_cors import CORS

app = Flask(__name__)
app.config["API_TITLE"] = "Redub.ia API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.2"
app.config["OPENAPI_JSON_PATH"] = "swagger.json"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_REDOC_PATH"] = "/redoc"
app.config["OPENAPI_REDOC_URL"] = "https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"

api = Api(app)
CORS(app)
register_routes(api)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"
