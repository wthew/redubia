from typing import Callable, TypeVar
from flask import g, Flask
from gotrue import UserResponse
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker, Session
# from flask_migrate import Migrate
from api.database import engine

def configure_database(app: Flask):
    """Configure the database."""
    
    # app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    # flask_db.init_app(app)
    # app.db = flask_db

    # Migrate(app, app.db, 'api/database/migrations')

    @app.before_request
    def populate_with_transaction():
        g.session = sessionmaker(engine, expire_on_commit=False)()

        def with_transaction(callback):            
            try:
                user: UserResponse = g.get('current_user', None)
                print('indo setar na seção usuario:', user)
                # session.execute(text(f"SET app.current_user_id = {int(user)}"))
                return callback(g.session)
                
            except Exception as exception:
                g.session.rollback()
                raise exception
            
            finally:
                # g.session.execute(text('RESET ROLE;'))
                g.session.commit()
                
        
        g.with_transaction = with_transaction
    
    @app.after_request
    def remove_session(response):
        g.session.close()
        
        return response
    
