import random
from math import pow

class Gamal:  
    a = random.randint(2, 10)
    def __init__(self,path,q,h,g):
        self.path = "backend/publicKey/txt/" + path
        self.q = int(q)
        self.h = int(h)
        self.g = int(g)
        self.name = path

        
    

    
    # Asymmetric encryption
    def encrypt(self):
        msg = open(self.path).read()
        en_msg = []
    
        k = gen_key(self.q)# Private key for sender
        s = power(self.h, k, self.q)
        p = power(self.g, k, self.q)
        
        for i in range(0, len(msg)):
            en_msg.append(msg[i])
    
        print("g^k used : ", p)
        print("g^ak used : ", s)
        for i in range(0, len(en_msg)):
            en_msg[i] = s * ord(en_msg[i])
        Epath = "backend/publicKey/txt/" + self.name.split('.')[0] + 'E.txt'
        txt = open(Epath, "w")
        txt.write(' '.join(str(x) for x in en_msg))
        txt.write(" "+str(p))
        print("Encrypted: ")
        print(en_msg)
        return txt
    
    def decrypt(self, key):
        txt2 = open(self.path, "r")
        en_msg = [int(ele) for ele in txt2.read().split(' ')]
        p = int(en_msg.pop())
        dr_msg = []
        h = power(p, key, self.q)
        for i in range(0, len(en_msg)):
            dr_msg.append(chr(int(en_msg[i]/h)))
        dmsg = ''.join(dr_msg)
        Dpath = "backend/publicKey/txt/" + self.name.split('.')[0] + 'D.txt'
        txt2 = open(Dpath, "w")
        txt2.write(dmsg)
        print("Decrypted Message :", dmsg)
        return txt2

#great common divisor 

def gcd(a, b):
    if a < b:
        return gcd(b, a)
    elif a % b == 0:
        return b;
    else:
        return gcd(b, a % b)

# Generating large random numbers
def gen_key(q):

    key = random.randint(pow(10, 20),q)
    while gcd(q, key) != 1:
        key = random.randint(pow(10, 20),q)

    return key

# Modular exponentiation
def power(a, b, c):
    x = 1
    y = a

    while b > 0:
        if b % 2 != 0:
            x = (x * y) % c;
        y = (y * y) % c
        b = int(b / 2)

    return x % c
def gen_values():
    q = random.randint(pow(10, 20), pow(10, 50))
    g = random.randint(2, q)
    key = gen_key(q)# Private key for receiver
    h = power(g, key, q)
    return q,g,key,h
    # Driver code
def main():
    q,g,key,h = gen_values()
    mensaje = Gamal('sample.txt',q,g,h)
    en_msg = mensaje.encrypt()
    mensajee = Gamal('sampleE.txt',q,g,h)
    de_msg = mensajee.decrypt(key)

    


if __name__ == '__main__':
    main()