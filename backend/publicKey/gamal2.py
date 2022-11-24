import base64
from Crypto.PublicKey import ECC
import random
class Gamal2:
    #Elliptic Curve General Form:
    # (y^2)mod p =(x^3  + a*x + b)mod p
    def __init__(self,msg,mode):
        self.msg = msg.lower()
        self.mode = mode
        if mode in ['NIST P-192','NIST P-224','NIST P-256','NIST P-384','NIST P-521','Ed25519','Ed448']:
            self.key = ECC.generate(curve= mode).export_key(format='PEM')
            f = open('myprivatekey.pem','wt')
            f.write(self.key)
            f.close()

    def encrypt(self):
        key = ECC.import_key(self.key)
        pkey = ECC.EccKey.public_key(key)
        beta = key.pointQ.x * pkey.pointQ.x 
        k = pow(-1,random.randint(0,1))*random.randint(1,2147483646)
        M=[(ord(character)-97) for character in self.msg]
        en = "["
        for m in M:
            en += '['+ str(hex(int(pkey.pointQ.x)*k)) + ',' + str(hex(m+k*int(beta))) + '],'
        en= en[:-1]
        en += ']'
        print(en)
        return  en

    def decrypt(self,encripted):
        f = open('myprivatekey.pem','rt')
        key = ECC.import_key(f.read())
        encripted = encripted[:-2]
        encripted = encripted[2:]
        encripted = encripted.split('],[')
        print(encripted)
        decripted = ""
        for e in encripted:
            e = e.split(',')
            Mx=int(e[1],16)-int(key.pointQ.x)*int(e[0],16)
            if( Mx >= 0):
                decripted+= chr(Mx+97)
            else:
                print("lost value")
        print("The message recieved by reciever is:\t",decripted)
        return   decripted      

def main():
    men = Gamal2("pepe perez uwu",'NIST P-256')
    uwu = men.encrypt()
    men.decrypt(uwu)
