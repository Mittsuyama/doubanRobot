#/myPackage/reading.py

import requests
from bs4 import BeautifulSoup
import json

class Reading:

    headers = {}
    proxies = {}
    url = 'book.douban.com'
    
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
    
    def bookInformations(self):
        pass

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
        
        for i in range(0, len(title)):
            print(title[i])
            print(author[i])
            print(brief[i])
            if isSpoiler == None:
                print('comment has a spoiler')
            response = requests.get('https://book.douban.com/j/review/%s/full' % (order[i]), headers = self.headers)
            jsonData = json.loads(response.text)
            tempSoup = BeautifulSoup(jsonData['html'], features = 'html.parser')
            for content in tempSoup.find_all('p'):
                if content.string != None:
                    print(content.string)
                    print('\n')