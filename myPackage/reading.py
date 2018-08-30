#/myPackage/reading.py

import requests
from bs4 import BeautifulSoup
import json

def pushListGetKey(List):
    for i in range(0, len(List)):
        print('%d : %s' % (i + 1, List[i]))
    print('Input number and press enter ----->')
    getKeyboard = int(input())
    print('-------your choice is %s-------' % (List[getKeyboard - 1]))
    return getKeyboard

class Reading:

    headers = {}
    proxies = {}
    url = 'https://book.douban.com'
    f = open('content.md', 'w')
    
    def __init__(self):
        self.headers = {
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language' : 'en,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
        }
    
    def newBooks(self):
        pass
    
    def topTags(self):
        pass

    def notePage(self, url):
        response = requests.get(url, headers = self.headers)
        soup = BeautifulSoup(response.text, features = 'html.parser')
        soup = soup.find('div', id = 'note_%s_full' % (url[28:-1]))
        if soup.find('div', 'introduction') is not None:
            self.f.write('> %s\n\n' % (soup.find('div', 'introduction').string))
        for child in soup.descendants:
            if child.name == None: continue
            if child.name == 'div' and child.has_attr('class') and child['class'][0] == 'image-wrapper':
                imageUrl = child.img.get('src')
                self.f.write('![image](%s)\n' % (imageUrl))
            if child.name == 'p':
                if child.parent.name == 'div' and child.parent.has_attr('class') and child.parent['class'][0] == 'introduction':
                    continue
                if len(child.contents) == 0: continue
                for content in child.contents:
                    if content.name == 'span':
                        self.f.write('**%s**' % (content.string))
                    else:
                        self.f.write(content.string)
                self.f.write('\n\n')
            if child.name == 'div' and child.has_attr('class') and child['class'][0] == 'subject-wrapper':
                self.f.write('> ')
                for content in child.descendants:
                    if content.name == 'span' and content.has_attr('class') and content['class'][0] == 'title-text':
                        self.f.write('《' + content.string + '》\n')
                    if content.name == 'div' and content.has_attr('class') and content['class'][0] == 'subject-summary':
                        self.f.write(content.string)
                self.f.write('\n\n')
        
    def bookInformations(self):
        self.f.write('# 图书资讯\n\n')
        response = requests.get(self.url, headers = self.headers)
        soup = BeautifulSoup(response.text, features = 'html.parser')

        title, author, image, content = [], [], [], []
        for slideItem in soup.find_all('li', 'slide-item info-block'):
            noteUrl = slideItem.find('a').get('href')
            self.f.write('## %s\n' % (slideItem.find('span').string))
            self.notePage(noteUrl)
        self.f.close()
 

    def bestSellers(self):
        pass
    
    def getTopCommentsRequest(self, page):
        self.url = 'https://book.douban.com/review/best/'
        if page == 1 or page > 3:
            return requests.get(self.url, headers = self.headers)
        if page == 2:
            return requests.get(self.url, headers = self.headers, params = {'start' : '20'})
        if page == 3:
            return requests.get(self.url, headers = self.headers, params = {'start' : '40'})

    def topCommnets(self):
        #get HTMLContent
        self.f.write('# 热门评论\n\n')
        response = self.getTopCommentsRequest(1)
        soup = BeautifulSoup(response.text, features = 'html.parser')
        title, author, isSpoiler, brief, order = [], [], [], [], []
        for content in soup.find_all(alt = True, title = True):
            title.append(content['title'])
        for content in soup.find_all('a', 'name'):
            author.append(content.string)
        for content in soup.find_all('h2'):
            brief.append(content.string)
            order.append(content.find('a')['href'][-8:-1])
        for content in soup.find_all('div', 'short-content'):
            isSpoiler.append(content.find('p', 'spoiler-tip'))
        
        '''
        for i in range(0, 1):
            print(title[i])
            print(author[i])
            print(brief[i])
            if isSpoiler == None:
                print('comment has a spoiler')
            response = requests.get('https://book.douban.com/j/review/%s/full' % (order[i]), headers = self.headers)
            jsonData = json.loads(response.text)
            tempSoup = BeautifulSoup(jsonData['html'], features = 'html.parser')
            for content in tempSoup.descendants:
                if(content.name == 'p' and content.string != None):
                    print(content.string)
                    print('\n')
                if(content.name == 'img'):
                    print('![%s](%s)' % (title[i], content['src']))
                    print('\n')
        '''

        for i in range(0, len(title)):
            self.f.write('## %s\n\n' % (title[i]))
            self.f.write(author[i] + '\n\n')
            self.f.write('> %s\n\n' % (brief[i]))
            '''
            # spoiler warning
            if isSpoiler != None:
                self.f.write('comment has a spoiler')
            '''
            response = requests.get('https://book.douban.com/j/review/%s/full' % (order[i]), headers = self.headers)
            jsonData = json.loads(response.text)
            tempSoup = BeautifulSoup(jsonData['html'], features = 'html.parser')
            for content in tempSoup.descendants:
                if(content.name == 'p' and content.string != None):
                    self.f.write(content.string + '\n\n')
                if(content.name == 'img'):
                    self.f.write('![%s](%s)\n\n' % (title[i], content['src']))