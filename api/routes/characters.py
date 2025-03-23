from flask import g
from flask.views import MethodView
from sqlalchemy.orm import Session
from api.database.repositories import CharacterRepository, DubbingCastRepository
from api.lib.typing_utils import with_transaction
from api.schemas.models import MediaEntitySchema, CharacterSchema
from api.lib import create_api_blueprint, example_response
from api.schemas.routes import ByIdRequestSchema

NAMESPACE = "Personagens"
api = create_api_blueprint(NAMESPACE)

@api.route("/characters")
class CharactersController(MethodView):
    @example_response(api, MediaEntitySchema(many=True))
    @api.doc(operationId="getCharacters")
    def get(self):
        return g.with_transaction(lambda s: CharacterRepository(s).get_all())


@api.route("/characters/<string:id>")
class CharacterByIdController(MethodView):
    @api.arguments(ByIdRequestSchema, location="path")
    @example_response(api, CharacterSchema())
    @api.doc(operationId="getCharacterById")
    def get(self, *args, **kwargs):
        id = kwargs.get('id', '')
        
        if not id:
            return {}, 400
        
        def callback(s: Session):
            character = CharacterRepository(s).get(id)

            if character is None:
                return {}, 404
            
            dubbing_cast = DubbingCastRepository(s).get_by_character_id(id)
            if dubbing_cast:
                character.dubbing_cast = dubbing_cast # type: ignore

            return character
        
        return with_transaction(callback)