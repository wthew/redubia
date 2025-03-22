from flask import g
from flask.views import MethodView

from sqlalchemy.orm import Session
from api.database.repositories import DubbingCastRepository, VoiceActorRepository
from api.lib.typing_utils import with_transaction
from api.schemas.models import MediaEntitySchema, VoiceActorSchema
from api.lib import create_api_blueprint, example_response
from api.schemas.routes import ByIdRequestSchema

NAMESPACE = "Dubladores"
api = create_api_blueprint(NAMESPACE)

@api.route("/voice-actors")
class VoiceActorsController(MethodView):
    @example_response(api, MediaEntitySchema(many=True))
    @api.doc(operationId="getVoiceActors")
    def get(self):
        return g.with_transaction(lambda s: VoiceActorRepository(s).get_all())




@api.route("/voice-actors/<string:id>")
class VoiceActorByIdController(MethodView):
    @api.arguments(ByIdRequestSchema, location="path")
    @example_response(api, VoiceActorSchema())
    @api.doc(operationId="getVoiceActorById")
    def get(self, *args, **kwargs):
        id = kwargs.get('id', '')
        
        if not id:
            return {}, 400
        
        def callback(s: Session):
            voice_actor = VoiceActorRepository(s).get(id)

            if voice_actor is None:
                return {}, 404
            
            dubbing_cast = DubbingCastRepository(s).get_by_voice_actor_id(id)
            if dubbing_cast:
                voice_actor.dubbing_cast = dubbing_cast # type: ignore

            return voice_actor
        
        return with_transaction(callback)