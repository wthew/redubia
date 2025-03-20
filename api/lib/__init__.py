from base64 import b64encode, b64decode
from importlib import import_module as module
from sys import path
from os import listdir, environ
from functools import wraps
from typing import Callable, List
from flask_smorest import Blueprint
from api.schemas.bases import SchemaWithExample

def create_api_blueprint(name: str):
    return Blueprint('api', name, url_prefix="/api")


def import_from_folder(folder: str):
    path.append(folder)

    def seek():
        for i in listdir(folder):
            if i[:2] != '__':
                yield i.replace('.py', '')

    return { key: module(name=key) for key in list(seek()) }


def encode_base64(string):
    _bytes = b64encode(string.encode("ascii"))
    return _bytes.decode("ascii")

def decode_base64(string):
    _bytes = b64decode(string)
    output = _bytes.decode("utf-8")
    return output

def example_response(api: Blueprint, schema: SchemaWithExample):
    
    def decorator(fn):
        @api.response(200, schema=schema, example=schema.dump(schema.example()))
        @wraps(fn)
        def wrapper(*args, **kwargs):
            return fn(*args, **kwargs)

        return wrapper

    return decorator

_callbacks: List[Callable] = []
def init_app():
    for callback in _callbacks:
        callback()

    environ["INITIALIZED"] = "1"


def run_on_init_app(fn: Callable):
    if not environ.get("INITIALIZED", None):
        _callbacks.append(fn)

    return fn