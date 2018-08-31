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

    def notePage(self, url):
        response = requests.get(url, headers = self.headers)
        soup = BeautifulSoup(response.text, features = 'html.parser')
        soup = soup.find('div', id = 'link-report')
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
        self.f.write('---\n')
        
    def bookInformations(self):
        self.f.write('# 图书资讯\n\n')
        response = requests.get(self.url, headers = self.headers)
        soup = BeautifulSoup(response.text, features = 'html.parser')

        title, author, image, content = [], [], [], []
        for slideItem in soup.find_all('li', 'slide-item info-block'):
            noteUrl = slideItem.find('a').get('href')
            self.f.write('## %s\n' % (slideItem.find('span').string))
            print('getting ' + slideItem.find('span').string + '...\n')
            self.notePage(noteUrl)
        self.f.close()
    
    def formatWrite(self, myStr):
        judge = False
        for i in myStr:
            if i == ':':
                judge = True
        if judge == False:
            myStr += ':'
        self.f.write(myStr.strip(' '))

    def drawStar(self, starNum):
        intStarNum = round(starNum)
        for i in range(0, intStarNum):
            self.f.write('★')
        for i in range(intStarNum, 10):
            self.f.write('☆')
        self.f.write('\n')
    
    def bookInfoPage(self, bookUrl):
        response = requests.get(bookUrl, headers = self.headers)
        soup = BeautifulSoup(response.text, features = 'html.parser')

        # get title
        title = soup.find('span', property = "v:itemreviewed").string
        print('getting ' + title)
        self.f.write('\n## %s\n\n' % (title))

        # get image
        imageUrl = soup.find('a', class_ = 'nbg').get('href')
        self.f.write('![%s](%s)' % (title, imageUrl))

        # get brief information
        scoreNum = soup.find('strong', class_ = 'll rating_num ').string
        self.f.write('\n**豆瓣评分：' + scoreNum.strip(' ') + '**   ')
        self.drawStar(float(scoreNum.strip(' ')))
        # ----------------------------
        self.f.write('\n```\n')
        otherInfo = soup.find('div', id = 'info')
        for content in otherInfo.descendants:
            if content.name == 'span' and content.has_attr('class') and content['class'][0] == 'pl':
                self.formatWrite(content.string)
                self.f.write('  ')
                if content.next_sibling.next_sibling.name == 'a':
                    self.f.write(content.next_sibling.next_sibling.string.strip(' '))
                else:
                    self.f.write(content.next_sibling.string.strip(' '))
                self.f.write('\n')
        self.f.write('```\n')

        # content introduction
        self.f.write('### ' + '内容简介' + '\n')
        introdouction = soup.find('span', class_ = 'all hidden')
        if introdouction == None:
            introdouction = soup.find('div', id = 'link-report').find('div', class_ = 'intro')
        for intro in introdouction.descendants:
            if intro.name == 'p' and intro.string != None:
                self.f.write('  ')
                self.f.write(intro.string)
                self.f.write('\n')

        self.f.write('### ' + '作者介绍' + '\n')
        introdouction = soup.find('span', class_ = 'all hidden ')
        if introdouction == None:
            introdouction = soup.find('div', class_ = 'indent ').find('div', class_ = 'intro')
        for intro in introdouction.descendants:
            if intro.name == 'p' and intro.string != None:
                self.f.write('  ')
                self.f.write(intro.string)
                self.f.write('\n')
        
        # get catalog
        self.f.write('### 目录\n')
        catalog = soup.find('div', style = 'display:none')
        for content in catalog.descendants:
            if content.string != None and content.next_sibling.name != 'br':
                break
            if content.string != None: self.f.write(content.string)
        self.f.write('\n')

        self.f.write('\n---\n')
 
    def bestNotedBooks(self):
        response = requests.get(self.url, headers = self.headers)
        soup = BeautifulSoup(response.text, features = 'html.parser')
        bookList = soup.find('ul', 'chart-dashed-list')
        for book in bookList.find_all('div', 'media__body'):
            bookUrl = book.a.get('href')
            self.bookInfoPage(bookUrl)

    def bestNoted(self):
        self.f.write('# 受关注书籍榜\n\n')
        self.url = 'https://book.douban.com/chart?icn=index-topchart-nonfiction'
        self.bestNotedBooks()
        self.url = 'https://book.douban.com/chart?subcat=F&icn=index-topchart-fiction'
        self.bestNotedBooks()
        self.f.close()
    
    def getTopCommentsRequest(self, page):
        self.url = 'https://book.douban.com/review/best/'
        if page == 1 or page > 3:
            return requests.get(self.url, headers = self.headers)
        if page == 2:
            return requests.get(self.url, headers = self.headers, params = {'start' : '20'})
        if page == 3:
            return requests.get(self.url, headers = self.headers, params = {'start' : '40'})
        self.f.close()

    def topCommnets(self):
        #get HTMLContent
        self.f.write('# 热门评论\n\n')
        for i in range(1, 4):
            print('get %d page' % (i))
            response = self.getTopCommentsRequest(i)
            soup = BeautifulSoup(response.text, features = 'html.parser')
            title, author, isSpoiler, brief, order = [], [], [], [], []
            print('get titile')
            for content in soup.find_all(alt = True, title = True):
                title.append(content['title'])
            print('get author')
            for content in soup.find_all('a', 'name'):
                author.append(content.string)
            print('get brief introducion')
            for content in soup.find_all('h2'):
                brief.append(content.string)
                order.append(content.find('a')['href'][-8:-1])
            print('writing......')
            for content in soup.find_all('div', 'short-content'):
                isSpoiler.append(content.find('p', 'spoiler-tip'))
            
            # write in the Markdwon
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