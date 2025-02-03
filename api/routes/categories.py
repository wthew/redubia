from flask_smorest import Blueprint
from flask.views import MethodView
from api.redubia import dublagemApiClient
from api.schemas import CategoriesSchema, Namespace, image_example 
from api.utils import create_api_blueprint

api = create_api_blueprint(__name__)


@api.route("/categories")
class CategoriesController(MethodView):
    example = CategoriesSchema().load([{
        "id": 13544,
        "ns": Namespace(6),
        "title": "Categoria:Animações Brasileiras",
        "thumbnail": image_example
    }])

    @api.response(200, CategoriesSchema, example=CategoriesSchema().dump(example))
    @api.doc(operationId="getCategories")
    def get(self):
        res = dublagemApiClient.make_request(
            "action=query&format=json&prop=pageimages&generator=allpages&piprop=thumbnail%7Cname&gapnamespace=14")["query"]["pages"]
        return list(dict(res).values())
