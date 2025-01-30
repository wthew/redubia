from flask import Flask
from . import *

routes = [
    categories,
    search
]

def register_routes(app: Flask):
    for route in routes:
        app.register_blueprint(route.api, url_prefix="/api", name=route.__name__)
            