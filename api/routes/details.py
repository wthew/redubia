from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint
from redubia import dublagemApiClient
from api.schemas import CoverSchema, image_example, PageDetailsSchema
from utils import create_api_blueprint

api = create_api_blueprint(__name__)

@api.route("/cover/<int:page_id>")
class CoverController(MethodView):
    example = CoverSchema().load({ "original": image_example })

    @api.response(200, CoverSchema, example=CoverSchema().dump(example))
    def get(self, page_id: int):
        size = request.args.get('size', 300)

        return dublagemApiClient.cover_image(page_id, size)


@api.route("/page/<string:page_id>")
class PageDetailsController(MethodView):

    @api.response(200, PageDetailsSchema)
    def get(self, page_id: str):
        redubia = Redubia(page_id)

        return {
            'title': redubia.page.title,
            'summary': redubia.page.summary,
            'cover': dublagemApiClient.cover_image(page_id)
        }