from flask import Flask
from api.routes import configure_routes
from flask_cors import CORS
from api.database.setup import configure_database

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["API_TITLE"] = "Redub.ia API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.2"
    app.config["OPENAPI_JSON_PATH"] = "/swagger.json"
    app.config["OPENAPI_URL_PREFIX"] = "/api"
    app.config["OPENAPI_REDOC_PATH"] = "/redoc"
    app.config["OPENAPI_REDOC_URL"] = "https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config["OPENAPI_RAPIDOC_PATH"] = "/rapidoc"
    app.config["OPENAPI_RAPIDOC_URL"] = "https://unpkg.com/rapidoc/dist/rapidoc-min.js"
    
    configure_database(app)
    configure_routes(app)
    return app

app = create_app()

@app.route("/api/python")
def hello_world():
    return f"<p>Hello, World!</p>"
