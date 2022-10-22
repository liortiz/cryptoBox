import numpy as np

class Sdes:
  def __init__(self, x, K):
     
    self.K = K
    self.x = x
  
  def generate_keys_sdes(key):
      p8 = [6, 3, 7, 4, 8, 5, 10, 9]
      p10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6]
      # Step-1
      key_ = [1]*10
      for i in range(0, 10):
          key_[i] = key[p10[i] - 1]
      
      # Step-2
      l = key_[0:5]
      r = key_[5:10]
  
      # Step-3
      l = list(np.roll(l, -1))
      r = list(np.roll(r, -1))
  
      # Step-4
      key_ = l + r
      k1 = [1]*8
      for i in range(0, 8):
          k1[i] = key_[p8[i] - 1]
      
      # Step-5
      l = list(np.roll(l, -2))
      r = list(np.roll(r, -2))
  
      # Step-6
      key_ = l + r
      k2 = [1]*8
      for i in range(0, 8):
          k2[i] = key_[p8[i] - 1]
      
      return k1, k2
  
  def Function(self,arr, K1):
      EP = [4, 1, 2, 3, 2, 3, 4, 1]
      S0 = [[1, 0, 3, 2], [3, 2, 1, 0], [0, 2, 1, 3], [3, 1, 3, 2]]
      S1 = [[0, 1, 2, 3], [2, 0, 1, 3], [3, 0, 1, 0], [2, 1, 0, 3]]
      P4 = [2, 4, 3, 1]
  
      # Step-2
      l = arr[0:4]
      r = arr[4:8]
  
      s2 = [1]*8
      for i in range(0, 8):
          s2[i] = r[EP[i] - 1]
      
      for i in range(0, 8):
          s2[i] = K1[i] ^ s2[i]
      
      rl = s2[0:4]
      rr = s2[4:8]
  
      # For l
      row = int(str(rl[0]) + str(rl[3]), 2)
      column = int(str(rl[1]) + str(rl[2]), 2)
      s0 = self.toBinary(S0[row][column], 2)
  
      # For r
      row = int(str(rr[0]) + str(rr[3]), 2)
      column = int(str(rr[1]) + str(rr[2]), 2)
      s1 = self.toBinary(S1[row][column], 2)
  
      s_combined = s0 + s1
      r_p4 = [1]*4
      for i in range(0, 4):
          r_p4[i] = s_combined[P4[i] - 1]
      
      for i in range(0, 4):
          l[i] = r_p4[i] ^ l[i]
      
      return l + r
  
  def Swap(self,arr):
      l = arr[0:4]
      r = arr[4:8]
      return r + l
  
  
  def encrypt(self):

    IP = [2, 6, 3, 1, 4, 8, 5, 7]
    IP_inv = [4, 1, 3, 5, 7, 2, 8, 6]

    s1 = [1]*8
    for i in range(0, 8):
        s1[i] = self.x[IP[i] - 1]
    arr1 = self.Function(s1, self.K[0])
    after_swap = self.Swap(arr1)
    arr2 = self.Function(after_swap, self.K[1])
    cipherText = [1]*8
    for i in range(0, 8):
        cipherText[i] = arr2[IP_inv[i] - 1]
    return cipherText
    
  def decrypt(self):

    IP = [2, 6, 3, 1, 4, 8, 5, 7]
    IP_inv = [4, 1, 3, 5, 7, 2, 8, 6]

    s1 = [1]*8
    for i in range(0, 8):
        s1[i] = self.x[IP[i] - 1]

    arr1 = self.Function(s1, self.K[1])
    after_swap = self.Swap(arr1)
    arr2 = self.Function(after_swap, self.K[0])
    decryptedText = [1]*8
    for i in range(0, 8):
        decryptedText[i] = arr2[IP_inv[i] - 1]
    return decryptedText

    
  def toBinary(self,n, len):
    binary = []
    i = 1 << len - 1
    while i > 0:
        binary.append(1 if (n & i) else 0)
        i = i // 2
    return binary