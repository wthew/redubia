from enum import Enum
from marshmallow import Schema, fields, pre_dump, pre_load, missing
from json import dumps, loads
from api.utils import encode_base64, decode_base64

""" Enums"""


class Namespace(Enum):
    article = 0
    file = 6
    categories = 14
    with_audio = 500


""" Helper Schema Classes """


class WithPageId(Schema):
    id = fields.Int(attribute='pageid', required=True)

class ByIdRequestSchema(Schema):
    id = fields.Int()

class WithPagination(Schema):
    next_cursor = fields.Raw(validate=None)
    cursor = fields.Raw(validate=None)

    @pre_dump
    def pre_dump_details(self, data, **kwarg):
        output = dict(data)

        if isinstance(output.get('next_cursor', None), dict):
            output['next_cursor'] = encode_base64(dumps(output['next_cursor']))

        if isinstance(output.get('cursor', None), dict):
            output['cursor'] = encode_base64(dumps(output['cursor']))

        return output

    @pre_load
    def pre_load_details(self, data, **kwarg):
        output = dict(data)

        if isinstance(output.get('next_cursor', None), str):
            output['next_cursor'] = loads(decode_base64(output['next_cursor']))

        if isinstance(output.get('cursor', None), str):
            output['cursor'] = loads(decode_base64(output['cursor']))

        return output


class WithNamespace(Schema):
    ns = fields.Enum(Namespace, validate=None, required=True)

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
class ImageFileSchema(Schema):
    width = fields.Int(required=True)
    height = fields.Int(required=True)
    source = fields.Url(required=True)


class CoverSchema(Schema):
    original = fields.Nested(ImageFileSchema, required=True)


class GallerySchema(WithPageId):
    original = fields.Nested(ImageFileSchema, required=True)
    thumbnail = fields.Nested(ImageFileSchema, required=True)
    title = fields.Str(attribute='pageimage')

    class Meta:
        many = True


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
    title = fields.Str(required=True)
    thumbnail = fields.Nested(ImageFileSchema, required=True)


class PageSchema(WithNamespace, WithPageId):
    title = fields.Str(required=True)
    thumbnail = fields.Nested(ImageFileSchema, required=True)
    description = fields.Str(required=False)


class CategoriesRequestSchema(WithPagination):
    class Meta:
        exclude = ['next_cursor']


class CategoriesSchema(WithPagination):
    results = fields.List(fields.Nested(CategorySchema))


class PagesSchema(WithPagination):
    results = fields.List(fields.Nested(PageSchema))


# Details
class PageDetailsSchema(Schema):
    title = fields.Str(required=True)
    summary = fields.Str(required=True)
    cover = fields.Nested(CoverSchema, required=True)


""" Shared examples """
image_example = ImageFileSchema().load(
    {'width': 33, 'height': 50, 'source': 'https://redubia.vercel.app'})
