#/main.py

import requests
import myPackage

class mainClass:
    mainMenuList = []

    def Init(self):
        self.mainMenuList = ['Reading', 'Movies', 'Musics']

    def mainScene(self):
        print('-----Welcome to douban-----')
        for i in range(1, 4):
            print('%d : %s' % (i, self.mainMenuList[i - 1]))
        print('-----Input number and press enter------')
        keyboardInput = input()
        if keyboardInput == '1':
            pass

    def main(self):
    def mainScene(self):
        print('-----Welcome to douban-----')
        for i in range(1, 4):
            print('%d : %s' % (i, self.mainMenuList[i - 1]))
        print('-----Input number and press enter------')
        keyboardInput = input()
        if keyboardInput == '1':
            pass

    def main(self):
        self.Init()
        self.mainScene()

if __name__ == "__main__":
    mainClass().main()