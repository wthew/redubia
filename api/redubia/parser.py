"""
Parser class
"""

from bs4 import BeautifulSoup, ResultSet, Tag
from functools import reduce

class DubbingCastSectionParser:
    def __init__(self, html_source: str):
        self.soup = BeautifulSoup(html_source, 'html.parser')

    def parse(self):
        """ """

        def parse_table(table):
            headers = []
            columns = []

            for header in table.find_all('tr'):
                cols = 0

                for th in header.find_all('th'):
                    colspan = int(th['colspan']) if 'colspan' in th.attrs else 1
                    rowspan = int(th['rowspan']) if 'rowspan' in th.attrs else 1
                    
                    headers.extend([{ 
                        'title': th.get_text(strip=True),
                        'colspan': colspan,
                        'rowspan': rowspan
                    }])
                    
                    cols += colspan
                
                if cols > 0: columns.append(cols)
            
            columns = max(columns)
            
            def headers_reduce(acc, current):            
                if reduce(lambda a, b: a + b['colspan'],acc, 0) < columns:
                    acc.append(current)

                return acc
            
            def headers_transform(headers: list):
                output = []

                for i in headers:
                    output.extend([i] * i['colspan'])

                return output
            
            headers = list(filter(lambda a: a['colspan'] != columns, headers))
            headers = headers_transform(reduce(headers_reduce, headers, []))
            
            data = []

            skip = 0
            for row in table.find_all('tr'):
                if skip > 0:
                    skip -= 1
                    continue
                
                td = row.find_all('td')
                rows = [
                    int(i['rowspan']) if 'rowspan' in i.attrs else 1 for i in td
                ]

                if (len(rows)):
                    skip = max(rows) - 1
                
                row_data = {}
                for i, cell in enumerate(row.find_all(['td'])):
                    _data = {}

                    anchor = cell.find('a')

                    audio = cell.find('audio')
                    image = cell.find('img')

                    link = anchor['href'] if anchor is not None else ''
                    text = '' if audio is not None else cell.get_text().replace('\n', '')
                    
                    if text != '':
                        _data['text'] = text

                    if audio is not None:
                        _data['audio'] = link

                    if image is not None:
                        _data['image'] = {
                            'title': image['data-image-name'],
                            'original': {
                                'width': image['width'],
                                'height': image['height'],
                                'source': link
                            }
                        }

                    if headers[i]['colspan'] > 1:
                        old = row_data.get(headers[i]['title'], [])

                        old.append(_data)
                        row_data[headers[i]['title']] = old
                    else:
                        row_data[headers[i]['title']] = _data
                
                items = row_data.items()
                
                _data = []
                if len(items):
                    for field, value in items:
                        print(f'{value=}')

                        if isinstance(value, list):
                            value = { 'text': ', '.join(filter(lambda a: a != '', map(lambda a: a.get('text', ''), value))) }

                        _data.append({ 'field': field, 'value': value })
                
                if len(_data):
                    data.append(_data)
            
            return data

        title = self.soup.select_one('.mw-headline').get_text()  
        tables = self.soup.select('table.wikitable-large')   

        return { 'title': title, 'dubbing_cast': [parse_table(table) for table in tables] }
class  VoiceActorsWorksSectionParser:
    """
    Parse a dubbing cast table or a voice actor works list
    """

    def __init__(self, html_source: str):
        self.soup = BeautifulSoup(html_source, 'html.parser')

    def parse(self):
        """ """
        
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
        
        return {'title': title, 'works': list(__retrieve_all_lists())}
