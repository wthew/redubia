from enum import Enum
from marshmallow import Schema, fields, pre_dump, pre_load
from uuid import uuid4
from datetime import datetime

class Namespace(Enum):
    media = 0
    voice_actor = 1
    character = 2


class SchemaWithExample(Schema):
    def example(self):
        mapper = {
            'UUID': str(uuid4()),
            'DateTime': datetime.now().isoformat(),
            'String': 'string'
        }

        example = {
            field: mapper[type(field_data).__name__]
            for field, field_data in self._declared_fields.items()
        }

        return self.load([example] if self.many else example)



class SchemaWithNamespace(Schema):
    namespace = fields.Enum(Namespace, validate=None, required=True)

    @pre_dump
    def pre_dump_details(self, data, **kwarg):
        data['namespace'] = Namespace(data['namespace'])
        return data

    @pre_load
    def pre_load_details(self, data, **kwarg):
        data['namespace'] = data['namespace'].name
        return data


class SchemaWithPagination(Schema):
    pass


class SchemaWithPageId(Schema):
    id = fields.UUID()

