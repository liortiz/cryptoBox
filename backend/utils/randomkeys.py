import random

class Randomkeys:
  def desplazamientoRandomKey():
    return random.randint(1, 25)

  def permutacionRandomKey():
    keylen = random.randint(2,5)
    key = ''
    for i in range(keylen):
      key += str(i)

    key = ''.join(random.sample(key,keylen))
    
    Finalkey = ''
    for j in range(keylen-1):
      Finalkey +=key[j]+','
      
    Finalkey+=key[keylen-1]
    return Finalkey

  def sustitucionRandomKey():
    key = 'abcdefghijklmnopqrstuvwxyz'
   
    return ''.join(random.sample(key,26))

  def vigenereRandomKey():
    keylen = random.randint(5,10)
    key = ''
    for i in range (keylen):
      key += chr(random.randint(0,25)+97)
    
    return key

  def afinRandomKey():
    phi = [1,3,5,7,9,11,15,17,19,21,23,25]
    a = phi[random.randint(0,11)]
    b = random.randint(0,26)
    return [a,b]