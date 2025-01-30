

from flask_smorest import Blueprint
from flask.views import MethodView
from http import HTTPStatus
from redubia import dublagemApiClient
from marshmallow import Schema
from marshmallow.fields import Str, Int, Nested
from api import schemas 
from api.schemas.enums import Namespace

api = Blueprint('api', __name__)

class CategoriesResponseSchema(schemas.WithNamespace):
    id = Int(attribute='pageid')
    thumbnail = Nested(schemas.ImageFile)
    title = Str()

    class Meta:
        many = True

@api.route("/categories")
class CategoriesController(MethodView):
    
    @api.response(200, CategoriesResponseSchema)
    def get(self):
        res = dublagemApiClient.make_request("action=query&format=json&prop=pageimages&generator=allpages&piprop=thumbnail%7Cname&gapnamespace=14")["query"]["pages"]
        return list(dict(res).values())