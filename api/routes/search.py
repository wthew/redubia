from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint
from api.repositories import fandom
from api.schemas import  SearchSchema, Namespace, SearchRequestSchema
from api.utils import create_api_blueprint

api = create_api_blueprint(__name__)

@api.route("/search")
class SearchController(MethodView):
    example = SearchSchema().load([
        { "id": 174274, "ns": Namespace(0), "title": "Dan Da Dan" },
        { "id": 442, "ns": Namespace(0), "title": "Guilherme Briggs" }
    ])

    @api.arguments(SearchRequestSchema, location="query")
    @api.response(200, SearchSchema, example=SearchSchema().dump(example))
    @api.doc(operationId="search")
    def get(self, test):
        term = request.args.get('q', '')
        repo = fandom.make_repository(fandom.SearchRepository)
        
        return [] if term == '' else repo.all(term)
