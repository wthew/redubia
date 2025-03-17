from marshmallow_sqlalchemy import SQLAlchemyAutoSchema as Schema
from api.database import models


class BaseMeta:
    include_relationships = True
    load_instance = True


class VoiceActorSchema(Schema):
    class Meta(BaseMeta):
        model = models.VoiceActor


class CharacterSchema(Schema):
    class Meta(BaseMeta):
        model = models.Character


class MediaSchema(Schema):
    class Meta(BaseMeta):
        model = models.Media


class MediaCategoriesSchema(Schema):
    class Meta(BaseMeta):
        model = models.MediaCategories


class DubbingCastSchema(Schema):
    class Meta(BaseMeta):
        model = models.DubbingCast

