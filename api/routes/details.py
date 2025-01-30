from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint
from marshmallow import Schema, fields

from redubia import dublagemApiClient
from api import schemas 
from api.schemas.enums import Namespace

api = Blueprint('api', __name__)

class CoverResponseSchema(schemas.WithNamespace):
    thumbnail = fields.Nested(schemas.ImageFile)
    original = fields.Nested(schemas.ImageFile)

@api.route("/cover/<int:page_id>")
class CoverController(MethodView):
    @api.response(200, CoverResponseSchema)
    def get(self, page_id: int):
        size = request.args.get('size', 300)

        return dublagemApiClient.cover_image(page_id, size)
