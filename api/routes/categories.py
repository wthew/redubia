

from flask import Blueprint
from http import HTTPStatus
from flasgger import swag_from
from redubia import dublagemApiClient
from flask_marshmallow import Schema
from marshmallow.fields import Str, Int

api = Blueprint('api', __name__)

class SearchSchema(Schema):
    id = Int()
    title = Str()

@api.route("/categories")
def categories():
    res = dublagemApiClient.make_request("action=query&format=json&prop=pageimages&generator=allpages&piprop=thumbnail%7Cname%7Coriginal&gapnamespace=14")
    print("res:", res["query"]["pages"])

    return res["query"]["pages"]