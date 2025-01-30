from flask_smorest import Api
import api.routes

routes = [
    api.routes.categories,
    api.routes.search,
    api.routes.details
]

def register_routes(app: Api):
    for route in routes:
        app.register_blueprint(route.api, url_prefix="/api", name=route.__name__)
            