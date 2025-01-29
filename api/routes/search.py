from flask import Blueprint
from http import HTTPStatus
from flasgger import swag_from
from redubia import Redubia
from flask_marshmallow import Schema
from marshmallow.fields import Str, Int

api = Blueprint('api', __name__)

class SearchSchema(Schema):
    id = Int()
    title = Str()

@api.route("/search/<string:term>")
def search(term: str):
    '''Search by text
    ---
    parameters:
      - name: term
        in: path
        type: string
        required: true

    definitions:
        SearchResult:
            type: array
            items:
              $ref: '#/definitions/SearchResultItem'
        SearchResultItem:
            type: object
            properties:
                id:
                    type: integer
                title:
                    type: string
            
    responses:
      200:
        description: A list of result
        schema:
          $ref: '#/definitions/SearchResult'
    
    '''
    result = Redubia.search(term)
    print("teste search", result)
    print("dumps:", SearchSchema(many=True).dump(result))
    return SearchSchema(many=True).dump(result)
