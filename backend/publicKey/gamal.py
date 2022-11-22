import numpy as np

# Python program to illustrate ElGamal encryption

import random
from math import pow

class Gamal:
  def __init__(self):
    self.random = False
    self.key = 1

  def gcd(self,a, b):
    if a < b:
      return self.gcd(b, a)
    elif a % b == 0:
      return b
    else:
      return self.gcd(b, a % b)

  # Generating large random numbers
  def gen_key(self,q):
    self.key = random.randint(pow(10, 20), q)
    while self.gcd(q, self.key) != 1:
      self.key = random.randint(pow(10, 20), q)

    return self.key

  # Modular exponentiation
  def power(self,a, b, c):
    x = 1
    y = a

    while b > 0:
      if b % 2 != 0:
        x = (x * y) % c
      y = (y * y) % c
      b = int(b / 2)

    return x % c

  # Asymmetric encryption
  def encrypt(self,msg, q, h, g):
    
    q = int(q)
    g = int(g)
    h = int(h)
    print(h)

    en_msg = []

    if self.random:
      k = self.key
    else:
      k = self.gen_key(q)# Private key for sender
    s = self.power(h, k, q)
    p = self.power(g, k, q)
    
    for i in range(0, len(msg)):
      en_msg.append(msg[i])

    print("g^k used : ", p)
    print("g^ak used : ", s)
    for i in range(0, len(en_msg)):
      en_msg[i] = s * ord(en_msg[i])

    return ','.join(str(i) for i in en_msg), str(p)

  def decrypt(self,en_msg, p, key, q):

    q = int(q)
    p = int(p)
    key = int(key)
    en_msg = en_msg.split(',')

    dr_msg = []
    h = self.power(p, key, q)
    for i in range(0, len(en_msg)):
      print(en_msg[i])
      dr_msg.append(chr(int(int(en_msg[i])/h)))
      
    return ''.join(dr_msg)

  def gen_values(self):
    q = random.randint(pow(10, 20), pow(10, 50))
    g = random.randint(2, q)
    self.key = self.gen_key(q)# Private key for receiver
    h = self.power(g, self.key, q)
    self.random = True
    print(self.key)
    return str(q),str(g),str(self.key),str(h)