from flask import request
from flask.views import MethodView
from api.redubia import dublagemApiClient, Redubia
from api.repositories import fandom
from api.schemas import (
    Namespace,
    GallerySchema,
    CoverSchema,
    image_example,
    PageDetailsSchema,
    CategorySchema,
)
from api.utils import create_api_blueprint

api = create_api_blueprint(__name__)


@api.route("/cover/<int:id>")
class CoverController(MethodView):
    example = CoverSchema().load({"original": image_example})

    @api.response(200, CoverSchema, example=CoverSchema().dump(example))
    @api.doc(operationId="getCover")
    def get(self, id: int):
        size = request.args.get("size", 300)
        repo = fandom.make_repository(fandom.CoverRepository)
        return repo.get(id, size)


@api.route("/details/<int:id>")
class PageDetailsController(MethodView):
    @api.response(200, PageDetailsSchema)
    @api.doc(operationId="getDetails")
    def get(self, id: int):
        redubia = Redubia(id)
        res = fandom.make_repository(fandom.DetailsPageRepository).get(id)

        return {
            "title": redubia.page.title,
            "summary": "\n\n".join(res),
            "cover": dublagemApiClient.cover_image(id),
        }


@api.route("/details/<int:id>/categories")
class CategoriesForPageController(MethodView):
    example = CategorySchema(many=True).load(
        [
            {
                "id": 13544,
                "ns": Namespace(6),
                "title": "Animações Brasileiras",
                "thumbnail": image_example,
            }
        ]
    )

    @api.response(
        200,
        CategorySchema(many=True),
        example=CategorySchema(many=True).dump(example),
    )
    @api.doc(operationId="getCategoriesForPage")
    def get(self, id: int):
        res = fandom.make_repository(fandom.CategoriesByPageRepository).get(id)
        return res


@api.route("/gallery/<int:id>")
class PageGalleryController(MethodView):
    @api.response(200, GallerySchema)
    @api.doc(operationId="getGallery")
    def get(self, id: int):
        size = request.args.get("size", None)
        repo = fandom.make_repository(fandom.GalleryRepository)
        return repo.get(id, size)
