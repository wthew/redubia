import fandom

fandom.set_wiki("dublagem")
fandom.set_lang("..")

class Redubia:
    def __init__(self, page_id):
        self.page = fandom.page(pageid=page_id)

    @staticmethod
    def search(query: str):
        result = fandom.search(query, results=3)
        return [{'title': title, 'id': _id} for title, _id in result]


    def elenco(self):
        # usar bs4 e fazer parse da tabela de elenco, com suporte a links e etc
        pass
