from flask import Flask
from flask_smorest import Api
from api.routes import register_routes
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config["API_TITLE"] = "Redub.ia API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.2"
    app.config["OPENAPI_JSON_PATH"] = "swagger.json"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_REDOC_PATH"] = "/redoc"
    app.config["OPENAPI_REDOC_URL"] = (
        "https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"
    )
    
    CORS(app)
    
    register_routes(Api(app))
    return app

app = create_app()
