from requests import get
from flask import request
from flask.views import MethodView
from api.redubia import Redubia, dublagemApiClient
from api.schemas.models import WikiEntitySchema, ArticleSchema, ImageSchema, image_source_example 
from api.schemas.bases import Namespace 
from api.utils import create_api_blueprint
from api.repositories.fandom import make_repository, ArticlesRepository, GalleryRepository

api = create_api_blueprint(__name__)


@api.route("/articles/<int:id>")
class PageArticlesController(MethodView):

    @api.response(200, ArticleSchema)
    @api.doc(operationId="getArticle")
    def get(self, id: int):
        redubia = Redubia(id)
        details = make_repository(ArticlesRepository).get(id)
        print(f'{details=}')

        return {
            'ns': 0,
            'title': redubia.page.title,
            'description': redubia.page.summary,
            'cover': dublagemApiClient.cover_image(id),
            **details
        }


@api.route("/articles/<int:id>/gallery")
class PageGalleryController(MethodView):

    @api.response(200, ImageSchema(many=True))
    @api.doc(operationId="getGallery")
    def get(self, id: int):
        size = request.args.get('size', None)
        repo = make_repository(GalleryRepository)
        return repo.get(id, size)


@api.route("/articles/popular-pages")
class ArticlesPopularPagesController(MethodView):
    example = WikiEntitySchema(many=True).load([{
        "description": "...",
        "id": 442,
        "ns": Namespace(0),
        "thumbnail": image_source_example,
        "title": "Guilherme Briggs",
    }])

    @api.response(200, WikiEntitySchema(many=True), example=WikiEntitySchema(many=True).dump(example))
    @api.doc(operationId="getPopularPages")
    def get(self):
        res = get("https://dublagem.fandom.com/wikia.php?controller=GlobalExploreNavApiController&method=getPopularPages").json()
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