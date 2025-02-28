from marshmallow import Schema, fields
from api.schemas.models import WikiEntitySchema
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


class WikiEntitiesResponseSchema(SchemaWithPagination):
    results = fields.List(fields.Nested(WikiEntitySchema))

