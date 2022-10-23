from cgitb import handler
from codecs import ascii_encode
from dataclasses import replace
from string import ascii_letters

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
    
    def analysis(self,txt):
      EngOrdLetters=[ [ 'e' , 0.126 ] , [ 't' , 0.0937 ] , [ 'a' , 0.0834 ] , [ 'o' , 0.077 ] , [ 'n' , 0.068 ] , [ 'i' , 0.0671 ] , [ 'h' , 0.0611 ] , [ 's' , 0.0611 ] , [ 'r' , 0.0568 ] , [ 'l' , 0.0424 ] , [ 'd' , 0.0414 ] , [ 'u' , 0.0285 ] , [ 'c' , 0.0273 ] , [ 'm' , 0.0253 ] , [ 'w' , 0.0234 ] , [ 'y' , 0.0204 ] , [ 'f' , 0.0203 ] , [ 'g' , 0.0192 ] , [ 'p' , 0.0166 ] , [ 'b' , 0.0154 ] , [ 'v' , 0.0106 ] , [ 'k', 0.0087 ] , [ 'j' , 0.0023 ] , [ 'x' , 0.002 ] , [ 'q' , 0.0009 ] , [ 'z' , 0.0006 ] ]     
      
      LetterProb = self.getLetterFrecuency(txt)
      LetterProbOrd = []
      for i in range(26):
        
        CurrentMax = [0,0]
        for i in range(len(LetterProb)):
          if LetterProb[i][1] > CurrentMax[1]:
            CurrentMax = [i,LetterProb[i][1]]
      
        LetterProbOrd.append(LetterProb[CurrentMax[0]])
        del LetterProb[CurrentMax[0]]
        
      print(LetterProbOrd, len(LetterProbOrd))
    
    
      for i in range(len(txt)):
        a=0
        while txt[i]!= LetterProbOrd[a][0]:
          a+=1
          print(txt[i],LetterProbOrd[a][0])
    
        print(txt)
        txt = txt[:i] +  EngOrdLetters[a][0] + txt[i+1:]
        print(txt)
      
      return txt
      
    def getLetterFrecuency(self,x):
          lettersFreq = []
          for i in range(26):
            lettersFreq.append([chr(i+97),0])
          for j in x:
            k = ord(j)-97
            lettersFreq[k][1] +=1
          return lettersFreq
