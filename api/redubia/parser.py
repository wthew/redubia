"""
Parser class
"""

from bs4 import BeautifulSoup


class  Parser:
    """
    Parse a dubbing cast table or a voice actor works list
    """

    def __init__(self, html_source: str):
        self.soup = BeautifulSoup(html_source, 'html.parser')

    def parse_voice_actor_work_list(self):
        """ discover sorce type that maybe a table with dubbing cast or ul from
         a voice actor works and parse it  """

    def pase_dubbing_cast_table(self):
        """ discover sorce type that maybe a table with dubbing cast or ul from
         a voice actor works and parse it  """

    def parse(self):
        """ discover sorce type that maybe a table with dubbing cast or ul from
         a voice actor works and parse it  """

        print(self.soup.select_one('.mw-content-ltr'))
