from flask import Flask
from flask_cors import CORS as configure_cors

from api.routes import configure_routes
from api.database.setup import configure_database
from api.lib import init_app


def create_app():
    app = Flask(__name__)

    app.config["API_TITLE"] = "Redub.ia API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.2"
    app.config["OPENAPI_JSON_PATH"] = "/swagger.json"
    app.config["OPENAPI_URL_PREFIX"] = "/api"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    configure_cors(app)
    configure_database(app)
    configure_routes(app)

    init_app()

    return app

app = create_app()
if __name__ == '__main__':
    app.run(debug=True, port=5328)
