from flask import g
from flask.views import MethodView
from api.database.repositories import DubbingCastRepository, WatchableRepository
from sqlalchemy.orm import Session
from api.lib.typing_utils import with_transaction
from api.schemas.models import MediaEntitySchema
from api.lib import create_api_blueprint, example_response
from api.schemas.routes import ByIdRequestSchema
from api.schemas.models import WatchableSchema

NAMESPACE = "Midias"
api = create_api_blueprint(NAMESPACE)

@api.route("/watchables")
class WatchableController(MethodView):
    @example_response(api, MediaEntitySchema(many=True))
    @api.doc(operationId="getWatchable")
    def get(self):
        return g.with_transaction(lambda s: WatchableRepository(s).get_all())

@api.route("/watchables/<string:id>")
class WatchableByIdController(MethodView):
    @api.arguments(ByIdRequestSchema, location="path")
    @example_response(api, WatchableSchema())
    @api.doc(operationId="getWatchableById")
    def get(self, *args, **kwargs):
        id = kwargs.get('id', '')
        if not id:
            return {}, 400
        
        def callback(s: Session):
            watchable = WatchableRepository(s).get(id)
            if watchable is None:
                return {}, 404
            
            dubbing_cast = DubbingCastRepository(s).get_by_watchable_id(id)

            if dubbing_cast:
                watchable.dubbing_cast = dubbing_cast # type: ignore
            
            return watchable
        
        return with_transaction(callback)