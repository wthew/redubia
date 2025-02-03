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
        return data["query"]["pages"]


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

    def request(self, request: BaseRequest, cb=None):
        # TODO: suporte a paginação

        res = self.session.get(url=self.base_url, params=request.get_params())

        if cb is None:
            cb = request.get_data

        return cb(res.json())


class FandomRepositoryBase(RepositoryBase):
    def __init__(self, client: FandomClient):
        self.client = client

    def add(self, entity):
        print("cannot add in fandom")


class CategoryRepository(FandomRepositoryBase):
    def get(self, page_id):
        res = self.client.request(GetCategoriesByPageRequest(pageids=page_id))
        return res

    def all(self, criteria):
        res = self.client.request(GetCategoriesRequest())
        return res


class SearchRepository(FandomRepositoryBase):
    def get(self, query_term):
        res = self.client.request(SearhRequest(srsearch=query_term))
        return res[0]

    def all(self, criteria):
        res = self.client.request(SearhRequest(srsearch=query_term))
        return res


class CoverRepository(FandomRepositoryBase):
    def get(self, page_id, size):
        res = self.client.request(GetCoverRequest(pageids=page_id, pithumbsize=size))
        return res

    def all(self, criteria):
        print('cannot get many covers')


class GalleryRepository(FandomRepositoryBase):
    def get(self, page_id, size):
        res = self.client.request(GetGalleryRequest(pageids=page_id, pithumbsize=size))
        return res

    def all(self, criteria):
        print('cannot get many gallerys')


Repo = TypeVar("Repo", bound=FandomRepositoryBase)
def make_repository(cls: Repo) -> Repo:
    client = FandomClient()

    return cls(client)