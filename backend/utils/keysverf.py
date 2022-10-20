import random

class Keysverf:
  def desplazamientoVerf(key):
    key = str(key)
    for i in key:
      if ord(i)<48 or ord(i)>57:
        return False
        
    return True

  def permutacionVerf(key):
    key=key.replace(',','')
    for i in range(len(key)):
      if ord(key[i])<48 or ord(key[i])>57:
        return False
      elif str(i) not in key:
        return False

    return True
    
  def sustitucionVerf(key):
    abc = 'abcdefghijklmnopqrstuvwxyz'
   
    if len(key) != 26:
      return False
    else:
      for i in abc:
        if i not in key:
          return False

      return True

  def vigenereVerf(key):
    for i in key:
      if ord(i)<97 or ord(i)>122:
        return False
        
    return True

  def afinVerf(a,b):
    phi = [1,3,5,7,9,11,15,17,19,21,23,25]

    if a not in phi:
      return False

    b = str(b)
   
    for i in b:
      if ord(i)<48 or ord(i)>57:
        return False

    if int(b)>25:
        return False
    
    return True