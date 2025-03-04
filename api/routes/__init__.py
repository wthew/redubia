from flask_smorest import Api
from api.utils import import_from_folder
from os.path import dirname

def register_routes(app: Api):
    for name, route in dict(import_from_folder(dirname(__file__))).items():
        app.register_blueprint(route.api, name=name)
            