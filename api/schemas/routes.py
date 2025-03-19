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


class WikiEntitiesRequestSchema(SchemaWithPagination):
    class Meta:
        exclude = ['next_cursor']


class WikiEntitySchema(SchemaWithPageId, SchemaWithNamespace):
    name = fields.String()
    cover_url = fields.String()


class WikiEntitiesResponseSchema(SchemaWithPagination):
    results = fields.List(fields.Nested(WikiEntitySchema))


class LoginRequestSchema(Schema):
    email = fields.Str(required=True)
    password = fields.Str(required=True)
