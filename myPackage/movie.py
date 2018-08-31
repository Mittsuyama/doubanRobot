#/myPackage/movies.py

import requests
from bs4 import BeautifulSoup
import json

class Movie:

    headers = {}
    proxies = {}
    url = ''
    f = open('movieContent.md', 'w')

    def __init__(self):
        self.headers = {
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language' : 'en,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
        }
        self.url = 'https://movie.douban.com'

    def moviePage(self, movieUrl):
        respone = requests.get(movieUrl, headers = self.headers)
        soup = BeautifulSoup(respone.text, features = 'html.parser')

        # get title and simple information
        title = soup.h1.span.string
        self.f.write('## ' + title + '\n\n')
        subjectClearfix = soup.find('div', class_ = 'subject clearfix')
        imageUrl = subjectClearfix.img.get('src')
        self.f.write('![%s](%s)\n\n' % (title, imageUrl))
        simpeInfo = subjectClearfix.find('div', id = 'info')

        self.f.write('```\n')
        # draw stars
        self.f.write('豆瓣评分 : ' )
        score = soup.find('strong', class_ = 'll rating_num')
        score = float(str(score.string).strip())
        self.f.write(str(score) + '  ')
        score = round(score)
        for i in range(0, score):
            self.f.write('★')
        for i in range(score, 10):
            self.f.write('☆')

        for content in simpeInfo.descendants:
            if content.name != None and len(content.contents) > 0:
                continue
            if content.name == 'span':
                self.f.write(content.string)
            else:
                if content.string != None:
                    self.f.write(content.string)
        self.f.write('```\n')

        # get brief introduction
        briefIntroduction = soup.find('div', class_ = 'related-info')
        self.f.write('### ' + briefIntroduction.i.string + '\n\n')
        briefIntroduction = soup.find('span', property = 'v:summary')
        self.f.write('   ' + str(briefIntroduction.string).strip())
        self.f.write('\n\n')

        # get celebrities-list
        celeCha = soup.find('div', id = 'celebrities')
        self.f.write('### ' + celeCha.h2.i.string + '\n\n')
        celebritieList = soup.find('ul', class_ = 'celebrities-list from-subject __oneline')

        celeName = []
        role = []
        for i in celebritieList.find_all('a', class_ = 'name'):
            celeName.append(i.string)
        for i in celebritieList.find_all('span', class_ = 'role'):
            role.append(i.string)
        for i in range(0, len(celeName)):
            self.f.write(' - ' + role[i] + ': ' + celeName[i] + '\n')
        self.f.write('\n')

        # get comments
        comment = soup.find('div', id = 'comments-section')
        self.f.write('### ' + comment.i.string + '\n\n')
        comments = soup.find('div', id = 'hot-comments')
        for topComment in comments.find_all('span', class_ = 'short'):
            self.f.write(' - ' + topComment.string + '\n')
        self.f.write('\n')
        

    def hostShowing(self):
        self.f.write('# 正在上映\n\n')
        self.url = 'https://movie.douban.com/cinema/nowplaying/haerbin/'
        response = requests.get(self.url, headers = self.headers)
        soup = BeautifulSoup(response.text, features = 'html.parser')
        moveList = soup.find('ul', class_ = 'lists')
        for content in moveList.find_all('li', class_ = 'stitle'):
            movieUrl = content.a.get('href')
            movieName = content.a['title']
            print('getting ' + movieName + '...')
            if len(content.parent.find('li', class_ = 'srating').contents) < 5:
                continue
            self.moviePage(movieUrl)
        self.f.close()