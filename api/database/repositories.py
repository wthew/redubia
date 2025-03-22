from collections.abc import Sequence
from typing import TypeVar, Generic, Type
from sqlalchemy import ScalarResult, select
from sqlalchemy.orm import Session
from api.database import EntityNamespace
from api.database.models import DubbingCast, MediaEntity, Entity

T = TypeVar('T', bound=Entity)
class RepositoryBase(Generic[T]):
    model: Type[T]

    def __init__(self, session: Session):
        self.session = session

    def get_query(self, uuid: str | None = None):
        q = select(self.model)
        return q.where(self.model.id == uuid) if uuid else q

    def get(self, uuid: str):
        return self.session.scalars(self.get_query(uuid)).first()


    def get_all(self):
        result = self.session.scalars(self.get_query())
        return result.all()


class MediaEntityByNameSpace(RepositoryBase[MediaEntity]):
    namespace: EntityNamespace
    model = MediaEntity

    def get_query(self, uuid: str | None = None):
        query = select(self.model)
        query = query.where(self.model.namespace == self.namespace.value)

        if uuid:
            query = query.where(self.model.id == uuid)

        return query


class WatchableRepository(MediaEntityByNameSpace):
    namespace = EntityNamespace.watchable


class CharacterRepository(MediaEntityByNameSpace):
    namespace = EntityNamespace.character


class VoiceActorRepository(MediaEntityByNameSpace):
    namespace = EntityNamespace.voice_actor


class DubbingCastRepository(RepositoryBase):
    model = DubbingCast

    def get_by_watchable_id(self, watchable_id: str) -> Sequence[DubbingCast]:
        """Get all dubbing casts for a watchable."""

        q = select(self.model).where(DubbingCast.watchable_id == watchable_id)
        return self.session.scalars(q).all()
    
    def get_by_voice_actor_id(self, voice_actor_id: str) -> Sequence[DubbingCast]:
        """Get all dubbing casts for a voice actor."""
        q = select(self.model).where(DubbingCast.voice_actor_id == voice_actor_id)
        return self.session.scalars(q).all()
    
    def get_by_character_id(self, character_id: str) -> Sequence[DubbingCast]:
        """Get all dubbing casts for a character."""
        q = select(self.model).where(DubbingCast.character_id == character_id)
        return self.session.scalars(q).all()
    
