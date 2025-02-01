from importlib import import_module as module
from sys import path
from os import listdir

def import_from_folder(folder: str):
    path.append(folder)

    def seek():
        for i in listdir(folder):
            if i[:2] != '__':
                yield i.replace('.py', '')

    return { key: module(name=key) for key in list(seek()) }
