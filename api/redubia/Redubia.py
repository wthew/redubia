import fandom
import pprint
from bs4 import BeautifulSoup, Tag

fandom.set_wiki("dublagem")
fandom.set_lang("..")

class Redubia:
    def __init__(self, page_id):
        self.page = fandom.page(pageid=page_id)

    @staticmethod
    def search(query: str):
        result = fandom.search(query, results=3)
        return [{'title': title, 'id': _id} for title, _id in result]

    def table(self):
        soup = BeautifulSoup(self.page.html, 'html.parser')
        return str(soup.select_one('.wikitable-large'))



if __name__ == '__main__':
    test = Redubia(174274)
