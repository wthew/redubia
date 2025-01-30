from flask import Blueprint
from http import HTTPStatus
from flasgger import swag_from
from redubia import Redubia
from flask_marshmallow import Schema
from marshmallow.fields import Str, Int, Enum
from redubia import dublagemApiClient
from schemas.enums import Namespace

api = Blueprint('api', __name__)

class SearchSchema(Schema):
    ns = Enum(Namespace)
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
                ns:
                  type: integer
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

    res = dublagemApiClient.make_request(f"action=query&format=json&list=search&srsearch={term}")
    result = [{ 'id': i['pageid'], 'ns': Namespace(i['ns']), 'title': i['title'] } for i in res['query']['search']]
    
    return SearchSchema(many=True).dump(result)
