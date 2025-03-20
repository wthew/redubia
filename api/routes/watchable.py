from flask import g
from flask.views import MethodView
from api.database.repositories import WatchableRepository
from api.schemas.models import MediaEntitySchema
from api.lib import create_api_blueprint, example_response

NAMESPACE = "Midias"
api = create_api_blueprint(NAMESPACE)

@api.route("/watchable")
class WatchableController(MethodView):
    @example_response(api, MediaEntitySchema(many=True))
    @api.doc(operationId="getWatchable")
    def get(self):
        return g.with_transaction(lambda s: WatchableRepository(s).get_all())
