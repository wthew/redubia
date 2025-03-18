from flask import Flask
# from flask_migrate import Migrate
# from api.database.db import flask_db, DATABASE_URL

def configure_database(app: Flask):
    """Configure the database."""
    
    # app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    # flask_db.init_app(app)
    # app.db = flask_db

    # Migrate(app, app.db, 'api/database/migrations')
