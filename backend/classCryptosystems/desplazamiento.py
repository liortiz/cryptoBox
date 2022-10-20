import random



class Desplazamiento:
    def __init__(self, data, k):
      
        specialChars = "?!:;().,' " 
        for specialChar in specialChars:
          data = data.replace(specialChar, '')
       
        self.k = int(k)%26
        self.data = data.lower()

    def encriptar(self):
        num_data = np.array([ord(c)-97 for c in self.data])
        data_encryption = (num_data + self.k) % 26
        encryption = [chr(c+97) for c in data_encryption]
        return ''.join(encryption)

    def desencriptar(self):
        num_data = np.array([ord(c)-97 for c in self.data])
        data_decryption = (num_data - self.k) % 26
        decryption = [chr(c+97) for c in data_decryption]
        return ''.join(decryption)

    def criptoanalisis(self):
        '''possible_words = []
        for i in range(26):
            self.k = i
            possible_words.append(self.desencriptar())
        return possible_words
        '''
        best = ['',10]
        for g in range(26):
          sum = self.MG(self.data,g)
          if abs(0.65-sum)<best[1]:
            best = [g,abs(0.65-sum)]
            
        return best[0]
      
    def MG(self,y,g):

      Mg = 0
      
      LetterProb = [['a', 0.0834 ],['b', 0.0154 ],['c', 0.0273 ],['d', 0.0414 ],['e', 0.126 ],['f', 0.0203 ],['g', 0.0192 ],['h', 0.0611 ],['i', 0.0671 ],['j', 0.0023 ],['k', 0.0087 ],['l', 0.0424 ],['m', 0.0253 ],['n', 0.068 ],['o', 0.077 ],['p', 0.0166 ],['q', 0.0009 ],['r', 0.0568 ],['s', 0.0611 ],['t', 0.0937 ],['u', 0.0285 ],['v', 0.0106 ],['w', 0.0234 ],['x', 0.002 ],['y', 0.0204 ],['z', 0.0006 ]]

      for i in range(26):
        Mg += (LetterProb[i][1] * (y.count(chr(((i+g)%26)+97)))) / len(y)

      return Mg
