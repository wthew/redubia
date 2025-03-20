from marshmallow import Schema, fields
from api.schemas.bases import SchemaWithNamespace, SchemaWithPagination, SchemaWithPageId

class ByIdRequestSchema(Schema):
    id = fields.Int()


class SearchRequestSchema(Schema):
    q = fields.Str()


class SearchResponseSchema(SchemaWithPageId, SchemaWithNamespace):
    title = fields.Str()

    class Meta:
        many = True


class MediaEntitiesRequestSchema(SchemaWithPagination):
    class Meta:
        exclude = ['next_cursor']


class MediaEntitySchema(SchemaWithPageId, SchemaWithNamespace):
    name = fields.String()
    cover_url = fields.String()


class MediaEntitiesResponseSchema(SchemaWithPagination):
    results = fields.List(fields.Nested(MediaEntitySchema))


class LoginRequestSchema(Schema):
    email = fields.Str(required=True)
    password = fields.Str(required=True)
