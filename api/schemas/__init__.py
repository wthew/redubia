from .enums import Namespace
from marshmallow import Schema, fields, pre_dump
from marshmallow_enum import EnumField

class WithNamespace(Schema):
    ns = fields.Enum(Namespace)

    @pre_dump
    def pre_process_details(self, data, **kwarg):
        data['ns'] = Namespace(data['ns'])
        return data


class ImageFile(Schema):
    width = fields.Int()
    height = fields.Int()
    source = fields.Url()
    