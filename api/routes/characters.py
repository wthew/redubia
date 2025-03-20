from flask import g
from flask.views import MethodView
from api.database.repositories import CharacterRepository
from api.schemas.models import MediaEntitySchema
from api.lib import create_api_blueprint, example_response

NAMESPACE = "Personagens"
api = create_api_blueprint(NAMESPACE)

@api.route("/characters")
class CharactersController(MethodView):
    @example_response(api, MediaEntitySchema(many=True))
    @api.doc(operationId="getCharacters")
    def get(self):
        return g.with_transaction(lambda s: CharacterRepository(s).get_all())
