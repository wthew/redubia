from marshmallow import Schema, fields
from api.schemas.bases import SchemaWithPageId, SchemaWithNamespace


class ImageSourceFileSchema(Schema):
    width = fields.Int(required=True)
    height = fields.Int(required=True)
    source = fields.Url(required=True)

image_source_example = ImageSourceFileSchema().load({
    'width': 33, 'height': 50, 'source': 'https://redubia.vercel.app'
})


class ImageSchema(SchemaWithPageId):
    original = fields.Nested(ImageSourceFileSchema, required=True)
    thumbnail = fields.Nested(ImageSourceFileSchema, required=True)
    title = fields.Str(attribute='pageimage')


class WikiEntitySchema(SchemaWithNamespace, SchemaWithPageId):
    title = fields.Str(required=True)
    thumbnail = fields.Nested(ImageSourceFileSchema, required=True)
    description = fields.Str(required=False)


class ArticleSchema(WikiEntitySchema):
    title = fields.Str(required=True)
    cover = fields.Nested(ImageSchema)
    sections = fields.List(fields.Raw())
    categories = fields.List(fields.Nested(WikiEntitySchema))

    class Meta:
        exclude = ['thumbnail']
