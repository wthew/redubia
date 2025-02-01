from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint
from redubia import Redubia, dublagemApiClient
from api.schemas import  SearchSchema, Namespace, SearchRequestSchema
from utils import create_api_blueprint

api = create_api_blueprint(__name__)

@api.route("/search")
class SearchController(MethodView):
    example = SearchSchema().load([
        { "id": 174274, "ns": Namespace(0), "title": "Dan Da Dan" },
        { "id": 442, "ns": Namespace(0), "title": "Guilherme Briggs" }
    ])

    @api.arguments(SearchRequestSchema, location="query")
    @api.response(200, SearchSchema, example=SearchSchema().dump(example))
    def get(self, test):
        term = request.args.get('q', '')
        res = dublagemApiClient.make_request(f"action=query&format=json&list=search&srsearch={term}")
        return res['query']['search']
