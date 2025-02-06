import fandom
import requests
from bs4 import BeautifulSoup

fandom.set_wiki("dublagem")
fandom.set_lang("..")


class DublagemApiClient:
    def __init__(self):
        self.base_url = "https://dublagem.fandom.com/api.php"

    def make_request(self, args):
        url = f"{self.base_url}?{args}"
        res = requests.get(url)
        return res.json()

    def image_detail(self, image_file_name):
        args = f"action=query&format=json&prop=pageimages&titles={image_file_name}&pithumbsize=50&piprop=thumbnail%7Cname%7Coriginal"
        res = self.make_request(args)

        def parse(item):
            return item[1]

        return list(map(parse, res["query"]["pages"].items()))

    def cover_image(self, page_id, size=None):
        args = f"action=query&format=json&prop=pageimages&pageids={page_id}&piprop=thumbnail%7Cname%7Coriginal"
        if size:
            args += f"&pithumbsize={size}"

        return self.make_request(args)["query"]["pages"][f"{page_id}"]

    def gallery(self, page_id, size=None):
        args = f"action=query&format=json&prop=pageimages&pageids={page_id}&generator=images&piprop=thumbnail%7Cname%7Coriginal"
        if size:
            args += f"&pithumbsize={size}"

        res = dict(self.make_request(args)["query"]["pages"]).values()

        def filter_fn(item):
            return item.get("pageid", None) is not None and ".png" in str(
                item.get("title", "")
            )

        return list(filter(filter_fn, res))


class Redubia:
    def __init__(self, page_id):
        self.page = fandom.page(pageid=page_id)
        self.client = DublagemApiClient()

    @staticmethod
    def search(query: str):
        result = fandom.search(query, results=3)
        return [{"title": title, "id": _id} for title, _id in result]

    def table(self):
        soup = BeautifulSoup(self.page.html, "html.parser")
        return str(soup.select_one(".wikitable-large"))


if __name__ == "__main__":
    test = Redubia(174274)
