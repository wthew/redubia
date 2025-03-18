from flask.views import MethodView
from api.schemas.models import VoiceActorSchema
from api.utils import create_api_blueprint
from api.schemas.exemples import date, uuid

NAMESPACE = "Dubladores"
api = create_api_blueprint(NAMESPACE)

@api.route("/voice-actors")
class SearchController(MethodView):
    example = VoiceActorSchema(many=True).load([
        { "id": uuid(), "created_at": date(), "name": "Guilherme Briggs" }
    ])

    @api.response(200, VoiceActorSchema(many=True), example=VoiceActorSchema(many=True).dump(example))
    @api.doc(operationId="getVoiceActors")
    def get(self):
        # term = request.args.get('q', '')
        # repo = fandom.make_repository(fandom.SearchRepository)
        
        return []
