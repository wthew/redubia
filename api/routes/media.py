from flask.views import MethodView
from api.schemas.models import MediaSchema
from api.utils import create_api_blueprint
from api.schemas.exemples import date, uuid

NAMESPACE = "Midias"
api = create_api_blueprint(NAMESPACE)

@api.route("/media")
class SearchController(MethodView):
    example = MediaSchema(many=True).load([
        { "id": uuid(), "created_at": date(), "name": "Dan da dan" }
    ])

    @api.response(200, MediaSchema(many=True), example=MediaSchema(many=True).dump(example))
    @api.doc(operationId="getMedia")
    def get(self):
        # term = request.args.get('q', '')
        # repo = fandom.make_repository(fandom.SearchRepository)
        
        return []
