#/main.py

import requests
import myPackage

class mainClass:
    mainMenuList = []

    def Init(self):
        self.mainMenuList = ['Reading', 'Movies', 'Musics']

    def reading(self):
        myReading = myPackage.Reading()
        readingMenuList = ['new books', 'top tags', 'book information', 'best sellers', 'top comments']
        print('------your choice is reading------')
        for menuOrder in range(0, len(readingMenuList)):
            print('%d : %s' % (menuOrder + 1, readingMenuList[menuOrder]))
        print('Input number and press enter ----->')
        keyBoardInput = input()
        if keyBoardInput == '1': pass
        if keyBoardInput == '2': pass
        if keyBoardInput == '3': pass
        if keyBoardInput == '4': pass
        if keyBoardInput == '5': myReading.topCommnets()

    
    def movies(self):
        pass

    def musics(self):
        pass

    def mainScene(self):
        print('-----Welcome to douban-----')
        for i in range(1, 4):
            print('%d : %s' % (i, self.mainMenuList[i - 1]))
        print('Input number and press enter ----->')
        keyBoardInput = input()
        if keyBoardInput == '1': self.reading()
        if keyBoardInput == '2': self.movies()
        if keyBoardInput == '3': self.musics()

    def main(self):
        self.Init()
        self.mainScene()

if __name__ == "__main__":
    mainClass().main()