from os import environ
from enum import Enum
from sqlalchemy.orm import DeclarativeBase, scoped_session, sessionmaker
from sqlalchemy import create_engine

USER = environ.get("DB_USER")
PWD = environ.get("DB_PASSWORD")
HOST = environ.get("DB_HOST")
PORT = environ.get("DB_PORT")
DBNAME = environ.get("DB_NAME")

DATABASE_URL = f"postgresql+psycopg2://{USER}:{PWD}@{HOST}:{PORT}/{DBNAME}?sslmode=require"
engine = create_engine(DATABASE_URL)

class Base(DeclarativeBase):
    """Base model for all models"""


# Enums
class EntityNamespace(Enum):
    watchable = 'watchable'
    voice_actor = 'voice_actor'
    character = 'character'


Base.metadata.bind = engine # type: ignore

Session = scoped_session(sessionmaker())
Session.configure(bind=engine)
