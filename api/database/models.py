from enum import Enum
import sqlalchemy as sql
import sqlalchemy.dialects.postgresql as pg
from api.database import Base, engine, Session
from api.utils import run_on_init_app

class Entity():
    id = sql.Column(pg.UUID(as_uuid=True), primary_key=True, server_default=sql.text('gen_random_uuid()'))


class EntityNamespace(Enum):
    watchable = 'watchable'
    voice_actor = 'voice_actor'
    character = 'character'

class MediaEntity(Base, Entity):
    """Media model."""
    __tablename__ = 'media_entity'

    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, server_default=sql.text('now()'))
    namespace = sql.Column(pg.TEXT, nullable=False)
    name = sql.Column(pg.TEXT, nullable=False)
    cover_url = sql.Column(pg.TEXT)
    

class MediaCategories(Base, Entity):
    """Media categories model."""
    __tablename__ = 'media_categories'

    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, server_default=sql.text('now()'))
    category = sql.Column(sql.TEXT, nullable=False)
    media = sql.Column(pg.UUID(as_uuid=True), sql.ForeignKey('media_entity.id'), nullable=False)


class DubbingCast(Base, Entity):
    """Dubbing cast model."""
    __tablename__ = 'dubbing_cast'

    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, server_default=sql.text('now()'))
    media = sql.Column(pg.UUID(as_uuid=True), sql.ForeignKey('media_entity.id'), nullable=False)
    voice_actor = sql.Column(pg.UUID(as_uuid=True), sql.ForeignKey('media_entity.id'))
    character = sql.Column(pg.UUID(as_uuid=True), sql.ForeignKey('media_entity.id'))
    label = sql.Column(pg.TEXT)



# ensure rls for all tables
@run_on_init_app
def ensure_all_tables_exists():
    Base.metadata.create_all(engine)

@run_on_init_app
def ensure_row_level_security():
    for name in Base.metadata.tables.keys():
        command = sql.text(f'ALTER TABLE {name} ENABLE ROW LEVEL SECURITY')
        Session.execute(command)

    Session.commit()
