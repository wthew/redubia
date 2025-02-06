from flask import Flask
from json import dump, load, dumps, loads
from hashlib import md5
from os.path import join

def update_swagger_file(app: Flask):
    client = app.test_client()
    
    def get_current_json():
        return loads(client.get('/swagger.json').data)
    
    def get_local_json():    
        with open(join("api", 'swagger.json')) as file:
            return load(file)
    
    def get_hash(json):
        return md5(dumps(json, indent=2).encode()).digest().hex()

    current_swagger = get_current_json()
    local_swagger = get_local_json()

    if get_hash(local_swagger) != get_hash(current_swagger):
        with open(join("api", 'swagger.json'), 'w') as file:
            dump(current_swagger, file, indent=2)
