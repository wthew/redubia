# from flask import request
from flask.views import MethodView
# from api.repositories import fandom
from api.schemas.routes import  SearchResponseSchema, SearchRequestSchema
from api.utils import create_api_blueprint

api = create_api_blueprint(__name__)

@api.route("/search")
class SearchController(MethodView):
    example = SearchResponseSchema().load([
        { "id": 174274, "name": "Dan Da Dan" },
        { "id": 442, "name": "Guilherme Briggs" }
    ])

    @api.arguments(SearchRequestSchema, location="query")
    @api.response(200, SearchResponseSchema, example=SearchResponseSchema().dump(example))
    @api.doc(operationId="search")
    def get(self):
        # term = request.args.get('q', '')
        # repo = fandom.make_repository(fandom.SearchRepository)
        
        return []
