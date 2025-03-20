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

        T = TypeVar('T')
        def with_transaction(callback: Callable[[Session], T]):
            session = sessionmaker(engine, expire_on_commit=False)
            
            with session() as session:
                try:
                    user: UserResponse = g.get('current_user', None)
                    print('indo setar na seção usuario:', user)
                    # session.execute(text(f"SET app.current_user_id = {int(user)}"))
                    return callback(session)
                    
                except Exception as exception:
                    session.rollback()
                    raise exception
                
                finally:
                    session.execute(text('RESET ROLE;'))
                    session.commit()
                    session.close()
        
        g.with_transaction = with_transaction
