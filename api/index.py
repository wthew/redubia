from flask import Flask
from flask_smorest import Api
from flask_migrate import Migrate
# from api.routes import register_routes
from flask_cors import CORS
from api.utils.cache import cache
from api.database.setup import configure_database

def create_app():
    app = Flask(__name__)
    cache.init_app(app)
    configure_database(app)

    app.config["API_TITLE"] = "Redub.ia API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.2"
    app.config["OPENAPI_JSON_PATH"] = "/swagger.json"
    app.config["OPENAPI_URL_PREFIX"] = "/api"
    app.config["OPENAPI_REDOC_PATH"] = "/redoc"
    app.config["OPENAPI_REDOC_URL"] = "https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"
    
    CORS(app)
    api = Api(app)
    # register_routes(api)
    return app

app = create_app()

@app.route("/api/python")
def hello_world():
    return f"<p>Hello, World!</p>"
