from flask.views import MethodView
from api.schemas.models import CharacterSchema
from api.schemas.exemples import date, uuid
from api.utils import create_api_blueprint

NAMESPACE = "Personagens"
api = create_api_blueprint(NAMESPACE)

@api.route("/characters")
class SearchController(MethodView):
    example = CharacterSchema(many=True).load([
        { "id": uuid(), "created_at": date(), "name": "Eren yeager" }
    ])

    @api.response(200, CharacterSchema(many=True), example=CharacterSchema(many=True).dump(example))
    @api.doc(operationId="getCharacters")
    def get(self):
        # term = request.args.get('q', '')
        # repo = fandom.make_repository(fandom.SearchRepository)
        
        return []
