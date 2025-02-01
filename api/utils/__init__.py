from importlib import import_module as module
from sys import path
from os import listdir
from flask_smorest import Blueprint

def create_api_blueprint(name: str):
    return Blueprint('api', name, url_prefix="/api")


def import_from_folder(folder: str):
    path.append(folder)

    def seek():
        for i in listdir(folder):
            if i[:2] != '__':
                yield i.replace('.py', '')

    return { key: module(name=key) for key in list(seek()) }
