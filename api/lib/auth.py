from flask import g, request, jsonify
from functools import wraps
from api.lib.services.supabase import supabase_client


def get_user_by_token(token: str):
    if not token:
        return None

    if token.startswith('Bearer '):
        token = token.split(' ')[1]

    if token:
        user = supabase_client.auth.get_user(token)
        if not user:
            return None

        return user
    
    return None

def private_route(**kwargs):
    ensure_login = kwargs.get('ensure_login', False)

    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if not g.current_user and ensure_login:
                return jsonify({"error": "Token de autorização ausente"}), 401

            return f(*args, **kwargs)
        
        return wrapper
    
    return decorator