from marshmallow import Schema, fields
from api.schemas.bases import SchemaWithPageId

class ByIdRequestSchema(Schema):
    id = fields.UUID()


class SearchRequestSchema(Schema):
    q = fields.Str()


class SearchResponseSchema(SchemaWithPageId):
    title = fields.Str()

    class Meta:
        many = True


class LoginRequestSchema(Schema):
    email = fields.Str(required=True)
    password = fields.Str(required=True)
