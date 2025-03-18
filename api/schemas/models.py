from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from api.database import Session, models

class BaseSchema(SQLAlchemyAutoSchema):
    class Meta:
        include_relationships = True
        load_instance = True
        sqla_session = Session


class VoiceActorSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.VoiceActor


class CharacterSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.Character


class MediaSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.Media


class MediaCategoriesSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.MediaCategories


class DubbingCastSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.DubbingCast

