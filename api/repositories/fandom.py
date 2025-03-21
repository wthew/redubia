from requests import Session
from typing import TypeVar, Type
from api.schemas.bases import Namespace
from . import RepositoryBase
from bs4 import BeautifulSoup
from api.redubia.parser import VoiceActorsWorksSectionParser, DubbingCastSectionParser

class BaseRequest:
    _required_fields: list[str] = []
    _optional_fields: list[str] = []

    action = "query"
    format = "json"

    def __init__(self, check_required=True, **kwargs):
        if check_required:
            for field in self._required_fields:
                if kwargs.get(field, None) is None:
                    raise Exception(f'Required field "{field}" is not defined')

        for field in self._optional_fields:
            value = kwargs.get(field, None)
            if value is None:
                kwargs.update({field: value})

        self.__dict__.update(kwargs)

    def get_params(self):
        def value(key): return self.__getattribute__(key)

        fields = [
            i for i in dir(self)
            if not i.startswith('_') and not callable(value(i))
        ]
        return dict({key: value(key) for key in fields})

    def get_data(self, data):
        next_cursor = data.get('continue', None)
        return list(dict(data["query"]["pages"]).values()), next_cursor


class ByArticleIdRequest(BaseRequest):
    _required_fields = ['pageids']


class GetCategoriesRequest(BaseRequest):
    _optional_fields = ['pithumbsize']

    prop = "pageimages"
    generator = "allpages"
    piprop = "thumbnail|Cname"
    gapnamespace = Namespace.categories.value


class GetArticlesByCategoryRequest(BaseRequest):
    _required_fields = ['gcmpageid']
    _optional_fields =['pithumbsize']
    generator='categorymembers'
    prop='pageimages'


class GetCategoriesByArticleRequest(ByArticleIdRequest):
    generator = "categories"


class GetCoverRequest(ByArticleIdRequest):
    _optional_fields = ['pithumbsize']

    prop = "pageimages"
    piprop = "thumbnail|name|original"


class GetGalleryRequest(ByArticleIdRequest):
    _optional_fields = ['pithumbsize']

    prop = "pageimages"
    generator = "images"
    piprop = "thumbnail|Cname|Coriginal"


class SearhRequest(BaseRequest):
    _required_fields = ["srsearch"]

    list = "search"

    def get_data(self, data):
        return data['query']['search']


class ArticleSectionsRequest(BaseRequest):
    _required_fields=["pageid"]
    action="parse"
    prop="sections"

    def get_data(self, data):
        return list(data["parse"]["sections"])


class ArticleContentRequest(BaseRequest):
    _required_fields=[ "pageid" ]
    action='parse'
    prop="text"

    def get_data(self, data):
        return str(data["parse"]["text"]["*"])


class FandomClient:
    base_url = "https://dublagem.fandom.com/api.php"
    request_type = TypeVar('request_type', bound=BaseRequest)

    def __init__(self):
        self.session = Session()

    def request(self, request: request_type, pagination=None):
        params = request.get_params()

        if pagination is not None:
            params.update(pagination)

        data = self.session.get(url=self.base_url, params=params).json()

        return request.get_data(data)


class FandomRepositoryBase(RepositoryBase):
    def __init__(self, client: FandomClient):
        self.client = client

    def _filter(self, item):
        return dict(item).get('pageid', None) is not None
    
    def _map(self, item):
        return item

    def _parser(self, res):
        return list(filter(self._filter, map(self._map, res)))

    def add(self, entity):
        print("cannot add in fandom")


class CategoryRepository(FandomRepositoryBase):
    def _map(self, category):
        category['title'] = category['title'].replace('Categoria:', '')
        return category
    
    def _filter(self, category):
        item = dict(category)

        missing_id = item.get('pageid', None) is None
        missing_thumb = item.get('thumbnail', None) is None

        return not missing_id and not missing_thumb

    def get(self, **kwargs):
        category_id=kwargs.get('id', None)
        cursor=kwargs.get('cursor', None)

        res, next_cursor = self.client.request(GetArticlesByCategoryRequest(gcmpageid=category_id, pithumbsize=300), cursor)
        return self._parser(res), next_cursor

    def all(self, **kwargs):
        res, next_cursor = self.client.request(GetCategoriesRequest(pithumbsize=300), kwargs.get('cursor', None))
        return self._parser(res), next_cursor


class SearchRepository(FandomRepositoryBase):
    def get(self, query_term):
        res = self.client.request(SearhRequest(srsearch=query_term))
        return res[0]

    def all(self, query_term):
        res = self.client.request(SearhRequest(srsearch=query_term))
        return res


class CoverRepository(FandomRepositoryBase):
    def get(self, page_id, size):
        res = self.client.request(GetCoverRequest(
            pageids=page_id, pithumbsize=size))
        return res

    def all(self, criteria):
        print('cannot get many covers')


class GalleryRepository(FandomRepositoryBase):
    def _filter(self, image):
        item = dict(image)

        missing_id = item.get('pageid', None) is None
        missing_title = item.get('title', None) is None
        is_image = item['title'].find('.png') != -1

        return not missing_id and not missing_title and is_image


    def get(self, page_id, size):
        res, next_cursor = self.client.request(GetGalleryRequest(
            pageids=page_id,
            pithumbsize=size
        ))

        

        return self._parser(res)

    def all(self, criteria):
        print('cannot get many gallerys')


class ArticlesRepository(FandomRepositoryBase):
    def all(self, _):
        pass

    def get(self, pageid):
        sections = self.__get_sections_data(pageid)
        categories = self.__get_categories(pageid)
        
        return dict({ 'sections': sections, 'categories': categories })

    def __get_sections_data(self, pageid):
        sections = self.client.request(ArticleSectionsRequest(pageid=pageid))
        
        def is_voice_actor():
            res, _ = self.client.request(GetCategoriesByArticleRequest(pageids=pageid))
            __is = 108031
            out = len(list(filter(lambda a: a.get('pageid') == __is, res)))

            print(f'{out=}')

            return out
            

        actor = is_voice_actor()
        parser = VoiceActorsWorksSectionParser if actor else DubbingCastSectionParser
        
        output = []
        for section in sections:
            if section['toclevel'] != 1:
                continue

            if not parser:
                continue

            content = self.client.request(ArticleContentRequest(pageid=pageid, section=section['index']))

            soup = BeautifulSoup(content, "html.parser")
            
            for toc in soup.find_all(id='toc'):
                toc.decompose()

            output.append(parser(str(soup)).parse())
            if not actor: break
        
        return output

    def __get_categories(self, pageid):
        def _map(category):
            category['title'] = category['title'].replace('Categoria:', '')
            return category
        
        def _filter(category):
            item = dict(category)

            missing_id = item.get('pageid', None) is None
            is_category = item.get('ns', None) == Namespace.categories.value
            return not missing_id and is_category
        
        res, _ = self.client.request(GetCategoriesByArticleRequest(pageids=pageid))
        return list(map(_map, filter(_filter, res)))


Repo = TypeVar("Repo", bound=FandomRepositoryBase)
def make_repository(repo: Type[Repo]) -> Repo:
    return repo(FandomClient())
