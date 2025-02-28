from enum import Enum
from marshmallow import Schema, fields, pre_dump, pre_load
from json import dumps, loads
from api.utils import encode_base64, decode_base64

""" Enums """

class Namespace(Enum):
    article = 0
    file = 6
    categories = 14
    with_audio = 500


""" Bases Schemas """

class SchemaWithPageId(Schema):
    id = fields.Int(attribute='pageid', required=True)


class SchemaWithPagination(Schema):
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


class SchemaWithNamespace(Schema):
    ns = fields.Enum(Namespace, validate=None, required=True)

    @pre_dump
    def pre_dump_details(self, data, **kwarg):
        data['ns'] = Namespace(data['ns'])
        return data

    @pre_load
    def pre_load_details(self, data, **kwarg):
        data['ns'] = data['ns'].name
        return data

