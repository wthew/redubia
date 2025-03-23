from math import e
from typing import Type
from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from api.database import EntityNamespace, Session, models
from api.lib import inline_schema
from api.schemas.bases import SchemaWithExample

class BaseSchema(SQLAlchemyAutoSchema, SchemaWithExample):    
    class Meta:
        include_relationships = True
        sqla_session = Session

class MediaEntitySchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.MediaEntity

    namespace = fields.Enum(EntityNamespace, validate=None, required=True)
    categories = fields.List(fields.Nested('MediaCategoriesSchema', exclude=['media_entity']))


class MediaCategoriesSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.MediaCategories

    media_entity = inline_schema(MediaEntitySchema, exclude=['categories'])

class DubbingCastSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.DubbingCast

    watchable = inline_schema(MediaEntitySchema, exclude=['namespace'])
    voice_actor = inline_schema(MediaEntitySchema, exclude=['namespace'])
    character = inline_schema(MediaEntitySchema, exclude=['namespace'])

class WatchableSchema(MediaEntitySchema):
    class Meta(MediaEntitySchema.Meta):
        exclude = ['namespace']

    dubbing_cast = fields.List(inline_schema(DubbingCastSchema, exclude=['watchable']))

class VoiceActorSchema(MediaEntitySchema):
    class Meta(MediaEntitySchema.Meta):
        exclude = ['namespace']

    dubbing_cast = fields.List(inline_schema(DubbingCastSchema, exclude=['voice_actor']))

