from enum import Enum
from marshmallow import Schema, fields, pre_dump, pre_load

""" Enums"""

class Namespace(Enum):
    article = 0
    file = 6
    categories = 14


""" Helper Schema Classes """

class WithPageId(Schema):
    id = fields.Int(attribute='pageid')


class WithNamespace(Schema):
    ns = fields.Enum(Namespace, validate=None)

    @pre_dump
    def pre_dump_details(self, data, **kwarg):
        data['ns'] = Namespace(data['ns'])
        return data

    @pre_load
    def pre_load_details(self, data, **kwarg):
        data['ns'] = data['ns'].name
        return data


""" Concrete Schemas """

# Files
class ImageFile(Schema):
    width = fields.Int()
    height = fields.Int()
    source = fields.Url()


class CoverSchema(Schema):
    original = fields.Nested(ImageFile)


# Search
class SearchRequestSchema(Schema):
    q = fields.Str()


class SearchSchema(WithNamespace):
    id = fields.Int(attribute='pageid')
    title = fields.Str()

    class Meta:
        many = True

# Categories
class CategorySchema(WithNamespace, WithPageId):
    title = fields.Str()
    thumbnail = fields.Nested(ImageFile)


class CategoriesSchema(CategorySchema):
    class Meta:
        many = True


# Details
class PageDetailsSchema(Schema):
    title = fields.Str()
    summary = fields.Str()
    cover = fields.Nested(CoverSchema)

""" Shared examples """
image_example = ImageFile().load({ 'width': 33, 'height': 50, 'source': 'https://redubia.vercel.app' })
