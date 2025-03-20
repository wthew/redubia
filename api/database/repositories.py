from typing import TypeVar, Generic, Type
from sqlalchemy import select
from sqlalchemy.orm import Session
from api.database.models import MediaEntity, EntityNamespace
from api.database.models import Entity

T = TypeVar('T', bound=Entity)
class RepositoryBase(Generic[T]):
    model: Type[T]

    def __init__(self, session: Session):
        self.session = session

    def get_query(self, uuid: str | None = None):
        q = select(self.model)
        return q.where(self.model.id == uuid) if uuid else q

    def get(self, uuid: str):
        return self.session.scalar(self.get_query(uuid))

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
