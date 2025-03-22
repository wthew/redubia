from math import e
from typing import Type
from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from api.database import EntityNamespace, Session, models
from api.schemas.bases import SchemaWithExample

class BaseSchema(SQLAlchemyAutoSchema, SchemaWithExample):    
    class Meta:
        include_relationships = True
        sqla_session = Session


class MediaCategoriesSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.MediaCategories

    
    media_entity = fields.Nested('MediaEntitySchema', exclude=['categories'])


class MediaEntitySchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.MediaEntity

    namespace = fields.Enum(EntityNamespace, validate=None, required=True)
    categories = fields.List(fields.Nested(MediaCategoriesSchema, exclude=['media_entity']))

class DubbingCastSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.DubbingCast

    watchable = fields.Nested(MediaEntitySchema, exclude=['namespace'])
    voice_actor = fields.Nested(MediaEntitySchema, exclude=['namespace'])
    character = fields.Nested(MediaEntitySchema, exclude=['namespace'])


def inline_schema(schema: Type[SQLAlchemyAutoSchema], **kwargs):
    """Inline schema for SQLAlchemyAutoSchema."""
    class InlineSchema(schema):
        __name__ = f"Inline{schema.__name__}Schema"

        def schema_name_resolver(self):
            return None

    return fields.Nested(InlineSchema, **kwargs)

class WatchableSchema(MediaEntitySchema):
    class Meta(MediaEntitySchema.Meta):
        exclude = ['namespace']

    dubbing_cast = fields.List(inline_schema(DubbingCastSchema, exclude=['watchable']))


class VoiceActorSchema(MediaEntitySchema):
    class Meta(MediaEntitySchema.Meta):
        exclude = ['namespace']

    dubbing_cast = fields.List(inline_schema(DubbingCastSchema, exclude=['voice_actor']))

