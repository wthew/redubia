from flask import Flask, g, request
from flask_smorest import Api
from os.path import dirname
from api.lib import import_from_folder
from api.lib.auth import get_user_by_token
from api.lib.cache import cache

from apispec.ext.marshmallow.common import resolve_schema_cls
from apispec.ext.marshmallow import MarshmallowPlugin

def schema_name_resolver(schema):
    schema_cls = resolve_schema_cls(schema).__name__ # type: ignore
    return '' if schema_cls.startswith('Inline') else schema_cls

def configure_routes(app: Flask):
    cache.init_app(app)
    api = Api(app, spec_kwargs={ 'marshmallow_plugin': MarshmallowPlugin(schema_name_resolver) })

    @app.before_request
    def populate_current_user():
        token = request.headers.get('Authorization')
        if token:
            g.current_user = get_user_by_token(token)

    for route in dict(import_from_folder(dirname(__file__))).values():
        api.register_blueprint(route.api, name=route.NAMESPACE)
            