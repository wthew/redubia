from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint
from api.redubia import dublagemApiClient, Redubia
from api.repositories import fandom
from api.schemas import GallerySchema, CoverSchema, image_example, PageDetailsSchema
from api.utils import create_api_blueprint

api = create_api_blueprint(__name__)

@api.route("/cover/<int:id>")
class CoverController(MethodView):
    example = CoverSchema().load({ "original": image_example })

    @api.response(200, CoverSchema, example=CoverSchema().dump(example))
    @api.doc(operationId="getCover")
    def get(self, id: int):
        size = request.args.get('size', 300)
        repo = fandom.make_repository(fandom.CoverRepository)
        return repo.get(id, size)


@api.route("/details/<int:id>")
class PageDetailsController(MethodView):

    @api.response(200, PageDetailsSchema)
    @api.doc(operationId="getDetails")
    def get(self, id: int):
        redubia = Redubia(id)

        return {
            'title': redubia.page.title,
            'summary': redubia.page.summary,
            'cover': dublagemApiClient.cover_image(id)
        }


@api.route("/gallery/<int:id>")
class PageGalleryController(MethodView):

    @api.response(200, GallerySchema)
    @api.doc(operationId="getGallery")
    def get(self, id: int):
        size = request.args.get('size', None)
        repo = fandom.make_repository(fandom.CoverRepository)
        return repo.get(id, size)
