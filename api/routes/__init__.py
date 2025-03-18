from flask import Flask
from flask_smorest import Api
from os.path import dirname
from api.utils import import_from_folder
from api.utils.cache import cache

def configure_routes(app: Flask):
    cache.init_app(app)
    api = Api(app)

    for route in dict(import_from_folder(dirname(__file__))).values():
        api.register_blueprint(route.api, name=route.NAMESPACE)
            