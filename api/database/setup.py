from os import environ
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_migrate import Migrate

USER = environ.get("DB_USER")
PWD = environ.get("DB_PASSWORD")
HOST = environ.get("DB_HOST")
PORT = environ.get("DB_PORT")
DBNAME = environ.get("DB_NAME")

DATABASE_URL = f"postgresql+psycopg2://{USER}:{PWD}@{HOST}:{PORT}/{DBNAME}?sslmode=require"

class Base(DeclarativeBase):
    """Base model for all database models."""


db = SQLAlchemy(model_class=Base)

def configure_database(app: Flask):
    """Configure the database."""
    
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    
    db.init_app(app)
    
    app.db = db

    Migrate(app, app.db, 'api/database/migrations')
