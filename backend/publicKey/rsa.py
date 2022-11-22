import random
import base64

class RSA:

    
  def gcd(self,a, b):
      while b != 0:
          a, b = b, a % b
      return a
  
  
  def is_prime(self,num):
      if num == 2:
          return True
      if num < 2 or num % 2 == 0:
          return False
      for n in range(3, int(num**0.5)+2, 2):
          if num % n == 0:
              return False
      return True
  
  def generate_keypair(self,p, q):
      if not (self.is_prime(p) and self.is_prime(q)):
          raise ValueError('Both numbers must be prime.')
      elif p == q:
          raise ValueError('p and q cannot be equal')
      #n = pq
      n = p * q
  
      #Phi is the totient of n
      phi = (p-1) * (q-1)
  
      #Choose an integer e such that e and phi(n) are coprime
      e = random.randrange(1, phi)
  
      #Use Euclid's Algorithm to verify that e and phi(n) are comprime
      g = self.gcd(e, phi)
      while g != 1:
          e = random.randrange(1, phi)
          g = self.gcd(e, phi)
  
      
     
      #d = self.multiplicative_inverse(e, phi)
      d = pow(e, -1, phi)
     
      
      #Return public and private keypair
      #Public key is (e, n) and private key is (d, n)

      key = ''+str(e) + ',' + str(n) + ' | ' + str(d) + ',' + str(n) + ''
      return key
  
  def encrypt(self,pk, plaintext):
      pk = tuple(map(int, pk.split(',')))
      key, n = pk
    
      cipher = [str(len(str(n)))]
      for char in plaintext:
        c = str((ord(char) ** key) % n)
      
        for i in range(len(str(n))):
          if len(c) == i:
            c = "0"+c
        cipher.append(c)
    
      #return cipher
      message = ''.join(map(lambda x: str(x), cipher))
      message_bytes = message.encode('ascii')
      base64_bytes = base64.b64encode(message_bytes)
      base64_message = base64_bytes.decode('ascii')
      return base64_message
  
  def decrypt(self,pk, base64_message):
      pk = tuple(map(int, pk.split(',')))    
      key, n = pk
      
     
      base64_bytes = base64_message.encode('ascii')
      message_bytes = base64.b64decode(base64_bytes)
      message = message_bytes.decode('ascii')

      L= int(message[0])
      
      message = message[:0] + message[1:]

      ciphertext =[]
  
      while len(message)!=0:
     
        ciphertext.append(int(message[0:L:1]))
        message = message[L:]
        
   
 
      plain = [chr((char ** key) % n) for char in ciphertext]
      #Return the array of bytes as a string
      return ''.join(plain)