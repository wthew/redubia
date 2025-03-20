from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from api.database import Session, models
from api.schemas.bases import SchemaWithExample

class BaseSchema(SQLAlchemyAutoSchema, SchemaWithExample):    
    class Meta:
        include_relationships = True
        load_instance = True
        sqla_session = Session


class MediaEntitySchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.MediaEntity


class MediaCategoriesSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.MediaCategories


class DubbingCastSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = models.DubbingCast

