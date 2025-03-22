from typing import Callable, TypeVar
from sqlalchemy.orm import Session
from flask import g

TransactionResult = TypeVar('TransactionResult')
def with_transaction(callback: Callable[[Session], TransactionResult]) -> TransactionResult:
    return g.with_transaction(callback)
