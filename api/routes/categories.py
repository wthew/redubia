from flask_smorest import Blueprint
from flask.views import MethodView
from api.repositories import fandom
from api.schemas import CategorySchema, CategoriesSchema, CategoriesRequestSchema,  Namespace, image_example
from api.utils import create_api_blueprint, encode_base64
from json import loads, dumps

api = create_api_blueprint(__name__)


@api.route("/categories")
class CategoriesController(MethodView):
    example = CategoriesSchema().load({
        'results': [{
            "id": 13544,
            "ns": Namespace(6),
            "title": "Animações Brasileiras",
            "thumbnail": image_example
        }],
        'next_page': 'eyAiaGVsbG8iOiAid29ybGQiIH0='
    })

    @api.arguments(CategoriesRequestSchema, location="query")
    @api.response(200, CategoriesSchema, example=CategoriesSchema().dump(example))
    @api.doc(operationId="getCategories")
    def get(self, args):
        print(args)
        results, next_page = fandom.make_repository(
            fandom.CategoryRepository).all(pagination=args.get('page', None))

        return {'results': results, 'next_page': next_page}


@api.route("/categories/<int:id>")
class CategoriesByPageIdController(MethodView):
    example = CategorySchema(many=True).load([{
        "id": 13544,
        "ns": Namespace(6),
        "title": "Animações Brasileiras",
        "thumbnail": image_example
    }])

    @api.response(200, CategorySchema(many=True), example=CategorySchema(many=True).dump(example))
    @api.doc(operationId="getCategoriesForPage")
    def get(self, id: int):
        res = fandom.make_repository(fandom.CategoryRepository).get(id)
        return res
