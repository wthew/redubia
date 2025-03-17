import uuid
import sqlalchemy as sql
import sqlalchemy.dialects.postgresql as pg

from api.database.setup import db


class VoiceActor(db.Model):
    """Voice actor model."""
    __tablename__ = 'voice_actors'

    id = sql.Column(pg.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, default=sql.text('now()'))
    name = sql.Column(pg.TEXT, nullable=False)


class Character(db.Model):
    """Character model."""
    __tablename__ = 'characters'

    id = sql.Column(pg.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, default=sql.text('now()'))
    name = sql.Column(pg.TEXT, nullable=False)


class Media(db.Model):
    """Media model."""
    __tablename__ = 'media'

    id = sql.Column(pg.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, default=sql.text('now()'))
    name = sql.Column(pg.TEXT, nullable=False)
    cover_url = sql.Column(pg.TEXT)
    

class MediaCategories(db.Model):
    """Media categories model."""
    __tablename__ = 'media_categories'

    id = sql.Column(pg.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, default=sql.text('now()'))
    category = sql.Column(sql.BIGINT, nullable=False)
    media = sql.Column(pg.UUID(as_uuid=True), sql.ForeignKey('media.id'), nullable=False)


class DubbingCast(db.Model):
    """Dubbing cast model."""
    __tablename__ = 'dubbing_cast'

    id = sql.Column(pg.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, default=sql.text('now()'))
    media = sql.Column(pg.UUID(as_uuid=True), sql.ForeignKey('media.id'), nullable=False)
    voice_actor = sql.Column(pg.UUID(as_uuid=True), sql.ForeignKey('voice_actors.id'))
    character = sql.Column(pg.UUID(as_uuid=True), sql.ForeignKey('characters.id'))
    label = sql.Column(pg.TEXT)

    