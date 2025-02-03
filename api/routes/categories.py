from flask_smorest import Blueprint
from flask.views import MethodView
from api.repositories import fandom
from api.schemas import CategoriesSchema, Namespace, image_example, CategorySchema
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
        res = fandom.make_repository(fandom.CategoryRepository).all()
        return list(dict(res).values())


@api.route("/categories/<int:id>")
class CategoriesByPageIdController(MethodView):
    example = CategorySchema().load({
        "id": 13544,
        "ns": Namespace(6),
        "title": "Categoria:Animações Brasileiras",
        "thumbnail": image_example
    })

    @api.response(200, CategorySchema, example=CategorySchema().dump(example))
    @api.doc(operationId="getCategoriesForPage")
    def get(self, id: int):
        res = fandom.make_repository(fandom.CategoryRepository).get(id)
        return list(dict(res).values())
