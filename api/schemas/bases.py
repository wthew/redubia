from marshmallow import Schema, fields
from uuid import uuid4
from datetime import datetime

def _parse_uuid(_):
    """Parse UUID value."""
    return str(uuid4())

def _parse_datetime(_):
    """Parse datetime value."""
    return datetime.now().isoformat()

def _parse_string(_):
    """Parse string value."""
    return 'string'

def _parse_nested(x):
    """Parse nested schema."""
    if isinstance(x.schema, SchemaWithExample):
        return x.schema.dump(x.schema.example)
    
    return None

def _parse_list(x):
    """Parse list schema."""
    return [mapper[type(x.inner).__name__](x.inner)]

def _parse_enum(x):
    """Parse enum schema."""
    return list(x.enum.__members__.values())[0].name

mapper = {
    'UUID': _parse_uuid,
    'DateTime': _parse_datetime,
    'String': _parse_string,
    'Nested': _parse_nested,
    'List': _parse_list,
    'Enum': _parse_enum
}
class SchemaWithExample(Schema):
    """Base schema with example generation."""    
    
    def _parse(self, field_data):
        """Parse field data based on its type."""
        field_type = type(field_data).__name__
        if field_type in mapper:
            return mapper[field_type](field_data)
        
        return None

    @property
    def example(self):

        fields = self._declared_fields.items()
        example = {
            field: self._parse(field_data)
            for field, field_data in fields if field not in self.exclude
        }

        return self.load([example] if self.many else example)


class SchemaWithPageId(Schema):
    id = fields.UUID()

