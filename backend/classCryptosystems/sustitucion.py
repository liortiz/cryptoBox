import random
import sys
import os
sys.path.append('utils')
from utils import ngram_score
import re
import time

#txt = input("ingresa tu texto a encriptar: \n")

class Sustitucion:
    def __init__(self, data, key):
        specialChars = "?!:;().,'’` " 
        for specialChar in specialChars:
          data = data.replace(specialChar, '')
        self.data = data.lower()
        self.key = key
        print(self.data)
      
    def strToAscii(self,t):
     return [(ord(character)-97) for character in t]
    
    def VerifyKey(self):
        a=self.key
        for i in range (97,123):
            a= a.replace(chr(i),"",1)
        if len(a)!=0:
            return True 
        return False
     #lowercase without blanks

    def encrypt(self):
        self.VerifyKey()
        txt= self.strToAscii(self.data)
        askei= self.strToAscii(self.key)
        encript= list(map(lambda c:chr(askei[c]+97),txt)) #chr() de int to ascii
        return "".join(encript)
    
    def decrypt(self):
        txt2=""
        for c in self.data:
            txt2 += chr(self.key.find(c)+97)
        return txt2
          
    def getLetterFrecuency(self,x):
          lettersFreq = []
          for i in range(26):
            lettersFreq.append([chr(i+97),0])
          for j in x:
            k = ord(j)-97
            lettersFreq[k][1] +=1
          return lettersFreq
    def analysis(self):
      script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
      rel_path = "../utils/quadgrams.txt"
      abs_file_path = os.path.join(script_dir, rel_path)
      fitness = ngram_score.ngram_score(abs_file_path) # load our quadgram statistics
      self.data = re.sub('[^A-Z]','',self.data.upper())
      maxkey = list('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
      maxscore = -99e9 
      parentscore,parentkey = maxscore,maxkey[:]
      print ("Substitution Cipher solver, you may have to wait several iterations")
      print ("for the correct result. Press ctrl+c to exit program.")
      # keep going until we are killed by the user
      i = 1
      timeout = time.time() + 10
      while i<=100 or time.time()> timeout:
          i = i+1
          random.shuffle(parentkey)
          deciphered = Sustitucion(self.data,"".join(parentkey)).decrypt()
          parentscore = fitness.score(deciphered)
          count = 0
          while count < 1000:
              a = random.randint(0,25)
              b = random.randint(0,25)
              child = parentkey[:]
              # swap two characters in the child
              child[a],child[b] = child[b],child[a]
              deciphered = Sustitucion(self.data,"".join(child)).decrypt()
              score = fitness.score(deciphered)
              # if the child was better, replace the parent with it
              if score > parentscore:
                  parentscore = score
                  parentkey = child[:]
                  count = 0
              count = count+1
          # keep track of best score seen so far
          if parentscore>maxscore:
              maxscore,maxkey = parentscore,parentkey[:]
              print('\nbest score so far:',maxscore,'on iteration',i)
              self.key = ''.join(maxkey)
              self.analisis = '    best key: '+''.join(maxkey)
              self.analisis +='\n    plaintext: '+self.decrypt()
      return self.analisis   

    # def analysis(self,txt):
    #   EngOrdLetters=[ [ 'e' , 0.126 ] , [ 't' , 0.0937 ] , [ 'a' , 0.0834 ] , [ 'o' , 0.077 ] , [ 'n' , 0.068 ] , [ 'i' , 0.0671 ] , [ 'h' , 0.0611 ] , [ 's' , 0.0611 ] , [ 'r' , 0.0568 ] , [ 'l' , 0.0424 ] , [ 'd' , 0.0414 ] , [ 'u' , 0.0285 ] , [ 'c' , 0.0273 ] , [ 'm' , 0.0253 ] , [ 'w' , 0.0234 ] , [ 'y' , 0.0204 ] , [ 'f' , 0.0203 ] , [ 'g' , 0.0192 ] , [ 'p' , 0.0166 ] , [ 'b' , 0.0154 ] , [ 'v' , 0.0106 ] , [ 'k', 0.0087 ] , [ 'j' , 0.0023 ] , [ 'x' , 0.002 ] , [ 'q' , 0.0009 ] , [ 'z' , 0.0006 ] ]     
    #   LetterProb = self.getLetterFrecuency(txt)
    #   LetterProbOrd = []
    #   for i in range(26):
        
    #     CurrentMax = [0,0]
    #     for i in range(len(LetterProb)):
    #       if LetterProb[i][1] > CurrentMax[1]:
    #         CurrentMax = [i,LetterProb[i][1]]
      
    #     LetterProbOrd.append(LetterProb[CurrentMax[0]])
    #     del LetterProb[CurrentMax[0]]
        
    #   print(LetterProbOrd, len(LetterProbOrd))
    
    
    #   for i in range(len(txt)):
    #     a=0
    #     while txt[i]!= LetterProbOrd[a][0]:
    #       a+=1
    #       print(txt[i],LetterProbOrd[a][0])
    
    #     print(txt)
    #     txt = txt[:i] +  EngOrdLetters[a][0] + txt[i+1:]
    #     print(txt)
      
    #   return txt
