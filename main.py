#/main.py

import requests
import myPackage

class mainClass:
    mainMenuList = []

    def Init(self):
        self.mainMenuList = ['Reading', 'Movies', 'Musics']

    def chooseReading(self):
        myReading = myPackage.Reading()
        readingMenuList = ['new books', 'top tags', 'book information', 'best sellers', 'top comments']
        getKeyboard = myPackage.pushListGetKey(readingMenuList)
        if getKeyboard == 1: pass
        if getKeyboard == 2: pass
        if getKeyboard == 3: myReading.bookInformations()
        if getKeyboard == 4: pass
        if getKeyboard == 5: myReading.topCommnets()

    
    def chooseMovies(self):
        pass

    def chooseMusics(self):
        pass

    def mainScene(self):
        print('-----Welcome to douban-----')
        getKeyboard = myPackage.pushListGetKey(self.mainMenuList)
        if getKeyboard == 1: self.chooseReading()
        if getKeyboard == 2: self.chooseMovies()
        if getKeyboard == 3: self.chooseMusics()

    def main(self):
        self.Init()
        self.mainScene()

if __name__ == "__main__":
    mainClass().main()