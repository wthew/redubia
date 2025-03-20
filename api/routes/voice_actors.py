from flask import g
from flask.views import MethodView
from api.database.repositories import VoiceActorRepository
from api.schemas.models import MediaEntitySchema
from api.lib import create_api_blueprint, example_response

NAMESPACE = "Dubladores"
api = create_api_blueprint(NAMESPACE)

@api.route("/voice-actors")
class VoiceActorsController(MethodView):
    @example_response(api, MediaEntitySchema(many=True))
    @api.doc(operationId="getVoiceActors")
    def get(self):
        return g.with_transaction(lambda s: VoiceActorRepository(s).get_all())

