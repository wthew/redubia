from datetime import datetime
from uuid import uuid4

def date():
    return datetime.now().isoformat()

def uuid():
    return uuid4()