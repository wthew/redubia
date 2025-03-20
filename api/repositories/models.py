from sqlalchemy import select
from api.database.models import MediaEntity, EntityNamespace
from api.repositories import RepositoryBase

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
