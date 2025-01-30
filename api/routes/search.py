from flask_smorest import Blueprint
from flask.views import MethodView
from flask import request
from http import HTTPStatus
from redubia import Redubia
from marshmallow import Schema
from marshmallow.fields import Str, Int, Enum
from redubia import dublagemApiClient
from api import schemas
from schemas.enums import Namespace

api = Blueprint('api', __name__, )

class SearchSchemaRequest(Schema):
    q = Str()

class SearchSchemaResponse(schemas.WithNamespace):
    id = Int(attribute='pageid')
    title = Str()

    class Meta:
        many = True

@api.route("/search")
class SearchController(MethodView):
  @api.arguments(SearchSchemaRequest, location="query")
  @api.response(200, SearchSchemaResponse)
  def get(self, test):
      term = request.args.get('q', '')
      res = dublagemApiClient.make_request(f"action=query&format=json&list=search&srsearch={term}")
      return res['query']['search']
