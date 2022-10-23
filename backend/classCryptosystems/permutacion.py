import numpy as np
import itertools

class permutacion:
    def __init__(self, data, q):
        specialChars = "?!:;()..,' " 
        for specialChar in specialChars:
          data = data.replace(specialChar, '')
        
        self.data = data       
        self.permutation = [int(x) for x in q.split(",")]
        self.m = len(self.permutation)
        self.listdata = self.separar()
        

    def encrypt(self):
        encryption = ''
        for i in self.listdata:
            a = "".join(self.permuPartition(i, self.permutation))
            encryption += a
        print('este es el .py'+ encryption)
        return encryption

    def decrypt(self):
        self.permutation = self.inverPermutation()
        return self.encrypt()

    def cryptanalysis(self):
       
        divisores = []
        for i in range(1, (len(self.data)//2)+1) :
            if(len(self.data))%i == 0 and i <=6 :
                divisores.append(i)
        possibilities = []    
        if divisores == [1]:
            divisores.append(len(self.data))
        for d in divisores:
            
            self.m = d
            
            listdata = self.separar()
            permutations = list(itertools.permutations(list(range(d))))
            permutations.pop(0)
            for k in permutations :
                p = ""
                for l in listdata:
                    p += "".join(self.permuPartition(l,k))
                    
                possibilities.append(p)
                if len(possibilities) >50:
                    break
        return possibilities

    def separar(self):
        if int(len(self.data)) % self.m != 0:
            nx = (self.m * (int(len(self.data)/self.m)+1)) - len(self.data)
            self.data = self.data + 'x'*nx

        listData = []
        j = int(len(self.data)/self.m)
        for i in range(j):
            list1 = list(self.data[i*self.m : (i+1)*self.m])
            listData.append(list1)
        return listData
        
    def permuPartition(self, list, permutation):
        listFinal = []
        for i in permutation:
            listFinal.append(list[i])
        return listFinal

    def inverPermutation(self):
        inverpermutation = []
        for i in range(len(self.permutation)):
            inverpermutation.append(self.permutation.index(i))
        return inverpermutation