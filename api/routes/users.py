from flask import g, jsonify
from flask.views import MethodView
from api.lib import create_api_blueprint
from api.schemas.routes import LoginRequestSchema
from api.lib.services.supabase import supabase_client
from api.lib.auth import private_route

NAMESPACE = "Usuarios"
api = create_api_blueprint(NAMESPACE)

@api.route("/me")
class UserController(MethodView):
    @api.doc(operationId="getCurrentUserData")
    @private_route()
    def get(self):
        print('\n\n\n\n\n callback', g.current_user)
        return jsonify({})


@api.route("/sign-up")
class SignUpController(MethodView):
    @api.arguments(LoginRequestSchema)
    @api.doc(operationId="createAccount")
    def post(self, body):
        response = supabase_client.auth.sign_up(body)
        return {}


@api.route("/login")
class LoginController(MethodView):
    @api.arguments(LoginRequestSchema)
    @api.doc(operationId="login")
    def post(self, body):
        response = supabase_client.auth.sign_in_with_password(body)

        if not response.session:
            return {}

        return { 'access_token': response.session.access_token, 'refresh_token': response.session.refresh_token }