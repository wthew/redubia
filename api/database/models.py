import sqlalchemy as sql
import sqlalchemy.dialects.postgresql as pg
from api.database import Base

class VoiceActor(Base):
    """Voice actor model."""
    __tablename__ = 'voice_actors'

    id = sql.Column(pg.UUID(as_uuid=True), primary_key=True, server_default=sql.text('gen_random_uuid()'))
    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, server_default=sql.text('now()'))
    name = sql.Column(pg.TEXT, nullable=False)


class Character(Base):
    """Character model."""
    __tablename__ = 'characters'

    id = sql.Column(pg.UUID(as_uuid=True), primary_key=True, server_default=sql.text('gen_random_uuid()'))
    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, server_default=sql.text('now()'))
    name = sql.Column(pg.TEXT, nullable=False)


class Media(Base):
    """Media model."""
    __tablename__ = 'media'

    id = sql.Column(pg.UUID(as_uuid=True), primary_key=True, server_default=sql.text('gen_random_uuid()'))
    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, server_default=sql.text('now()'))
    name = sql.Column(pg.TEXT, nullable=False)
    cover_url = sql.Column(pg.TEXT)
    

class MediaCategories(Base):
    """Media categories model."""
    __tablename__ = 'media_categories'

    id = sql.Column(pg.UUID(as_uuid=True), primary_key=True, server_default=sql.text('gen_random_uuid()'))
    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, server_default=sql.text('now()'))
    category = sql.Column(sql.TEXT, nullable=False)
    namespace = sql.Column(sql.INTEGER, nullable=False)
    media = sql.Column(pg.UUID(as_uuid=True), sql.ForeignKey('media.id'), nullable=False)


class DubbingCast(Base):
    """Dubbing cast model."""
    __tablename__ = 'dubbing_cast'

    id = sql.Column(pg.UUID(as_uuid=True), primary_key=True, server_default=sql.text('gen_random_uuid()'))
    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, server_default=sql.text('now()'))
    media = sql.Column(pg.UUID(as_uuid=True), sql.ForeignKey('media.id'), nullable=False)
    voice_actor = sql.Column(pg.UUID(as_uuid=True), sql.ForeignKey('voice_actors.id'))
    character = sql.Column(pg.UUID(as_uuid=True), sql.ForeignKey('characters.id'))
    label = sql.Column(pg.TEXT)

    