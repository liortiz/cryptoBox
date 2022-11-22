 # Rabin.py
import random
import math
import base64

class Rabin:

  def encrypt(self,plaintext,n):
      n = int(n)
      cipher = []
      maxlen = 0
      for character in plaintext:
        char = bin(ord(character))
        
        char = char + char[2:]
      
        char = int(char,2)
        char =  char** 2 % n
        
        cipher.append(str(char)) 
        if len(str(char)) > maxlen:
          maxlen = len(str(char))

      for i in range(len(cipher)):
        el = cipher[i]
        for j in range(maxlen):
          if len(el) == j:
            el = "0"+el
        cipher[i]=el

        
      cipher.insert(0,maxlen)
      message = ''.join(map(lambda x: str(x), cipher))
 
      message_bytes = message.encode('ascii')
      base64_bytes = base64.b64encode(message_bytes)
      base64_message = base64_bytes.decode('ascii')
      
      return base64_message

  def decrypt(self,base64_message,key):
    p,q = tuple(map(int, key.split(',')))    
    plaintext = ''
    
    base64_bytes = base64_message.encode('ascii')
    message_bytes = base64.b64decode(base64_bytes)
    message = message_bytes.decode('ascii')

    L= int(message[0])
    
    message = message[:0] + message[1:]

    ciphertext =[]

    while len(message)!=0:
   
      ciphertext.append(int(message[0:L:1]))
      message = message[L:]

    for char in ciphertext:
      n = p * q
      r, s = 0, 0
      a = int(char)
      # find sqrt
      # for p
      if p % 4 == 3:
          r = self.sqrt_p_3_mod_4(a, p)
      elif p % 8 == 5:
          r = self.sqrt_p_5_mod_8(a, p)
      # for q
      if q % 4 == 3:
          s = self.sqrt_p_3_mod_4(a, q)
      elif q % 8 == 5:
          s = self.sqrt_p_5_mod_8(a, q)
  
      gcd, c, d = self.egcd(p, q)
      x = (r * d * q + s * c * p) % n
      y = (r * d * q - s * c * p) % n
      lst = [x, n - x, y, n - y]
      
      plainChar = self.chooseCandidate(lst)
      plaintext += chr(plainChar)

    return plaintext
   


  
  # Find SQROOT in Zp where p = 3 mod 4
  def sqrt_p_3_mod_4(self,a, p):
      r = pow(a, (p + 1) // 4, p)
      return r
  
  
  # Find SQROOT in Zp where p = 5 mod 8
  def sqrt_p_5_mod_8(self,a, p):
      d = pow(a, (p - 1) // 4, p)
      r =0
      if d == 1:
          r = pow(a, (p + 3) // 8, p)
      elif d == p - 1:
          r = 2 * a * pow(4 * a, (p - 5) // 8, p) % p
  
      return r

  def egcd(self,a, b):
      if a == 0:
          return b, 0, 1
      else:
          gcd, y, x = self.egcd(b % a, a)
          return gcd, x - (b // a) * y, y
  
  
  def chooseCandidate(self,lst):
    for i in lst:
      candidate = bin(i)
      half = int((len(candidate)-2)/2)
      
      if candidate[2:-half] == candidate[-half:]:
        
        return int(candidate[:-half],2)
        
    
    return ''