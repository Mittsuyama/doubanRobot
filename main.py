#/main.py

import requests
import myPackage
import os

class mainClass:
    mainMenuList = []

    def Init(self):
        self.mainMenuList = [
            'Reading',
            'Movies',
            'Musics'
        ]

    def chooseReading(self):
        myReading = myPackage.Reading()
        readingMenuList = [
            'book information',
            'best noted',
            'top comments'
        ]
        getKeyboard = myPackage.pushListGetKey(readingMenuList)
        if getKeyboard == 1: myReading.bookInformations()
        if getKeyboard == 2: myReading.bestNoted()
        if getKeyboard == 3: myReading.topCommnets()

    
    def chooseMovies(self):
        myMovies = myPackage.Movie()
        movieMenuList = [
            'host showing',
            'top movies',
            'top recommend',
            'top comments'
        ]
        getKeyboard = myPackage.pushListGetKey(movieMenuList)
        if getKeyboard == 1: myMovies.hostShowing()
        if getKeyboard == 2: pass
        if getKeyboard == 3: pass
        if getKeyboard == 4: pass

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