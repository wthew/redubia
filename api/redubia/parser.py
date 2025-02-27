"""
Parser class
"""

from bs4 import BeautifulSoup, ResultSet, Tag

class  VoiceActorsWorksSectionParser:
    """
    Parse a dubbing cast table or a voice actor works list
    """

    def __init__(self, html_source: str):
        self.soup = BeautifulSoup(html_source, 'html.parser')

    def parse(self):
        """ discover sorce type that maybe a table with dubbing cast or ul from
         a voice actor works and parse it  """
        
        def __parse_list(ul: Tag):
            for li in ul.find_all('li'):
                output = { 'text': li.get_text() }

                link = li.find('a')
                if link is not None: output['link'] = link['href']

                yield output

        def __retrieve_all_lists():
            lists: ResultSet[Tag] = self.soup.find_all('ul')

            for item in lists:                
                title = item.find_previous_sibling()
                if not title: continue

                title = title.select_one('.mw-headline').get_text()
                
                yield { 'title': title, 'items': list(__parse_list(item)) }
        
        title = self.soup.select_one('.mw-headline').get_text()
        
        return {'title': title, 'lists': list(__retrieve_all_lists())}
