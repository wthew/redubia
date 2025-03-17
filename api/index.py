from flask import Flask
from flask_smorest import Api
from api.routes import register_routes
from flask_cors import CORS
from api.utils.cache import cache
from os import environ, path
from dotenv import load_dotenv

load_dotenv(path.join(path.dirname(__file__), '..', '.env.local'))

app = Flask(__name__)
cache.init_app(app)

app.config["API_TITLE"] = "Redub.ia API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.2"
app.config["OPENAPI_JSON_PATH"] = "/swagger.json"
app.config["OPENAPI_URL_PREFIX"] = "/api"
app.config["OPENAPI_REDOC_PATH"] = "/redoc"
app.config["OPENAPI_REDOC_URL"] = "https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"
api = Api(app)

CORS(app)
register_routes(api)

@app.route("/api/python")
def hello_world():
    return f"<p>Hello, World!</p>"
