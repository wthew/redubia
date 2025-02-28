from flask.views import MethodView
from api.repositories import fandom
from api.schemas.routes import ByIdRequestSchema, WikiEntitiesRequestSchema, WikiEntitiesResponseSchema
from api.schemas.bases import Namespace
from api.schemas.models import image_source_example, WikiEntitySchema
from api.utils import create_api_blueprint

api = create_api_blueprint(__name__)


@api.route("/categories")
class CategoriesController(MethodView):
    example = WikiEntitiesResponseSchema().load({
        'results': [{
            "id": 13544,
            "ns": Namespace(6),
            "title": "Animações Brasileiras",
            "thumbnail": image_source_example
        }],
        'next_cursor': 'eyAiaGVsbG8iOiAid29ybGQiIH0='
    })

    @api.arguments(WikiEntitiesRequestSchema, location="query")
    @api.response(200, WikiEntitiesResponseSchema, example=WikiEntitiesResponseSchema().dump(example))
    @api.doc(operationId="getCategories")
    def get(self, args):
        results, next_cursor = fandom.make_repository(
            fandom.CategoryRepository).all(cursor=args.get('cursor', None))

        return {'results': results, 'next_cursor': next_cursor}


@api.route("/categories/<int:id>")
class CategoriesByPageIdController(MethodView):
    example = WikiEntitiesResponseSchema().load({
        'results': [{
        "id": 118646,
        "ns": Namespace(0),
        "title": "100 Coisas para Fazer Antes de Virar Zumbi",
        "thumbnail": image_source_example
    }],
        'next_cursor': 'eyAiaGVsbG8iOiAid29ybGQiIH0='

    })

    @api.arguments(ByIdRequestSchema, location='path')
    @api.arguments(WikiEntitiesRequestSchema, location="query")
    @api.response(200, WikiEntitiesResponseSchema(), example=WikiEntitiesResponseSchema().dump(example))
    @api.doc(operationId="getPagesByCategory")
    def get(self, *args, **kwargs):
        path, query = args
        results, next_cursor = fandom.make_repository(fandom.CategoryRepository).get(**dict(**path, **query))

        return {'results': results, 'next_cursor': next_cursor}
