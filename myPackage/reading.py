#/myPackage/reading.py

import requests

class Reading:

    headers = {}
    proxies = {}
    url = ''
    session = requests.Session()
    
    def __init__(self):
        self.headers = {
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language' : 'en,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
        }
        self.url = 'book.douban.com'
        self.session.get(url, headers = self.headers)

    
    def newBooks(self):
        pass
    
    def topTags(self):
        pass
    
    def bookInformations(self):
        pass

    def bestSellers(self):
        pass
    
    def topCommnets(self):
        self.url = 'https://book.douban.com/review/best/'