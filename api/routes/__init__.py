from flask import Flask, g, request
from flask_smorest import Api
from os.path import dirname
from api.auth import get_user_by_token
from api.utils import import_from_folder
from api.utils.cache import cache

def configure_routes(app: Flask):
    cache.init_app(app)
    api = Api(app)

    @app.before_request
    def populate_current_user():
        token = request.headers.get('Authorization')
        if token:
            g.current_user = get_user_by_token(token)

    for route in dict(import_from_folder(dirname(__file__))).values():
        api.register_blueprint(route.api, name=route.NAMESPACE)
            