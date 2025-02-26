from flask.views import MethodView
from json import loads, dumps
import requests
from api.schemas import PageSchema, CategoriesSchema, CategoriesRequestSchema, ByIdRequestSchema,  Namespace, image_example
from api.utils import create_api_blueprint, encode_base64

api = create_api_blueprint(__name__)

@api.route("/articles/popular-pages")
class ArticlesPopularPagesController(MethodView):
    example = PageSchema(many=True).load([{
    "description": "Guilherme Neves Briggs (Rio de Janeiro, 25 de julho de 1970) \u00e9 um ator, dublador, ex-diretor de dublagem, locutor, tradutor, desenhista e criador de conte\u00fado brasileiro. Em 2022, se mudou para Teres\u00f3polis. Como passou a morar longe dos est\u00fadios, decidiu n\u00e3o dublar mais presencialmente. Agora, dubla apenas via dublagem remota, atrav\u00e9s de um est\u00fadio montado em sua casa. O Escorpi\u00e3o Rei (2002) ...",
    "id": 442,
    "ns": Namespace(0),
    "thumbnail": image_example,
    "title": "Guilherme Briggs",
  }])

    @api.response(200, PageSchema(many=True), example=PageSchema(many=True).dump(example))
    @api.doc(operationId="getPopularPages")
    def get(self):
        res = requests.get("https://dublagem.fandom.com/wikia.php?controller=GlobalExploreNavApiController&method=getPopularPages").json()
        output = [
            {
                "description": item["description"],
                "pageid": item["id"],
                "ns": Namespace(0),
                "title": item["title"],
                "thumbnail": {
                    "source": str(item["thumbnail"]).replace('width/104', 'width/512').replace('height/104', 'height/512'),
                    "width": 512,
                    "height": 512
                }
            }
            for item in res
        ]

        return output