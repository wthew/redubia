from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint
from api.redubia import dublagemApiClient, Redubia
from api.schemas import CoverSchema, image_example, PageDetailsSchema
from api.utils import create_api_blueprint

api = create_api_blueprint(__name__)

@api.route("/cover/<int:id>")
class CoverController(MethodView):
    example = CoverSchema().load({ "original": image_example })

    @api.response(200, CoverSchema, example=CoverSchema().dump(example))
    def get(self, id: int):
        size = request.args.get('size', 300)

        return dublagemApiClient.cover_image(id, size)


@api.route("/details/<string:id>")
class PageDetailsController(MethodView):

    @api.response(200, PageDetailsSchema)
    def get(self, id: str):
        redubia = Redubia(id)

        return {
            'title': redubia.page.title,
            'summary': redubia.page.summary,
            'cover': dublagemApiClient.cover_image(id)
        }