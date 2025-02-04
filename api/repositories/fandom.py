from requests import Session
from typing import TypeVar
from api.schemas import Namespace
from . import RepositoryBase


class BaseRequest:
    _required_fields = []
    _optional_fields = []

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
        return list(dict(data["query"]["pages"]).values()), data["continue"]


class ByPageIdRequest(BaseRequest):
    _required_fields = ['pageids']


class GetCategoriesRequest(BaseRequest):
    prop = "pageimages"
    generator = "allpages"
    piprop = "thumbnail|Cname"
    gapnamespace = Namespace.categories.value


class GetCategoriesByPageRequest(ByPageIdRequest):
    generator = "categories"


class GetCoverRequest(ByPageIdRequest):
    _optional_fields = ['pithumbsize']

    prop = "pageimages"
    piprop = "thumbnail|name|original"


class GetGalleryRequest(ByPageIdRequest):
    _optional_fields = ['pithumbsize']

    prop = "pageimages"
    generator = "images"
    piprop = "thumbnail|Cname|Coriginal"


class SearhRequest(BaseRequest):
    _required_fields = ["srsearch"]

    list = "search"

    def get_data(self, data):
        return data['query']['search']


class FandomClient:
    base_url = "https://dublagem.fandom.com/api.php"

    def __init__(self):
        self.session = Session()

    def request_until_end(self, request: BaseRequest, continue_param={}):
        params = request.get_params()

        while True:
            params.update(continue_param)
            res = self.session.get(url=self.base_url, params=params).json()

            if 'continue' not in res:
                break

            data, continue_param = request.get_data(res)

    def request(self, request: BaseRequest, pagination=None, until_end=False):
        params = request.get_params()

        if pagination is not None:
            params.update(pagination)

        data = self.session.get(url=self.base_url, params=params).json()

        return request.get_data(data)


class FandomRepositoryBase(RepositoryBase):
    def __init__(self, client: FandomClient):
        self.client = client

    def _exclude_without_id(self, res):
        return list(filter(lambda item: dict(item).get('pageid', None) is not None, res))

    def add(self, entity):
        print("cannot add in fandom")


class CategoryRepository(FandomRepositoryBase):
    def _parser(self, categories):
        def mapper(category):
            category['title'] = category['title'].replace('Categoria:', '')
            return category
        
        return self._exclude_without_id(map(mapper, categories))

    def get(self, page_id):
        res = self.client.request(GetCategoriesByPageRequest(pageids=page_id))
        return self._parser(res)

    def all(self, **kwargs):
        res, pagination = self.client.request(GetCategoriesRequest(), kwargs.get('pagination', None))
        return self._parser(res), pagination


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
    def get(self, page_id, size):
        res = list(dict(self.client.request(GetGalleryRequest(
            pageids=page_id,
            pithumbsize=size
        ))).values())

        return self._exclude_without_id(filter(lambda item: item['title'].find('.png') is not -1, res))

    def all(self, criteria):
        print('cannot get many gallerys')


Repo = TypeVar("Repo", bound=FandomRepositoryBase)


def make_repository(cls: Repo) -> Repo:
    client = FandomClient()

    return cls(client)
