import base64
class Gamal2:
    #Elliptic Curve General Form:
    # (y^2)mod p =(x^3  + a*x + b)mod p
    def __init__(self,p,a,b,key,k,msg):
        self.p = int(p)
        self.a = int(a)
        self.b = int(b)
        self.key = int(key) #<p
        self.msg = msg.lower()
        self.k = int(k) #random <ps
        self.LHS=[[]]
        self.RHS=[[]]
        self.LHS.append([])
        self.RHS.append([])
    def polynomial(self):
        for i in range(0,self.p):
            self.LHS[0].append(i)
            self.RHS[0].append(i)
            self.LHS[1].append((i*i*i + self.a*i + self.b)%self.p)
            self.RHS[1].append((i*i)%self.p)

    def points_generate(self,arr_x,arr_y):
        count=0
        for i in range(0,self.p):
            for j in range(0,self.p):
                if(self.LHS[1][i]==self.RHS[1][j]):
                    count+=1
                    arr_x.append(self.LHS[0][i])
                    arr_y.append(self.RHS[0][j])
        return count
    def encrypt(self):
        if(self.key>=self.p or self.k>=self.p):
            print("'key' and 'k' should be less than 'p'.")
        else:
            #Polynomial
            self.polynomial()
            arr_x=[]
            arr_y=[]
            #Generating base points
            count=self.points_generate(arr_x,arr_y)
            #Print Generated Points
            print("Generated points are:")
            for i in range(0,count):
                print(i+1,": (",arr_x[i],",",arr_y[i],")",end=" ,")
            #Calculation of Base Point
            bx=arr_x[0]
            by=arr_y[0]
            print("Base Point taken is:\t(",bx,",",by,")\n")
            Qx=self.key*bx
            Qy=self.key*by
            print("Public key of sender is:\t(",Qx,",",Qy,")\n")
            public_key = [Qx,Qy]
            base_point= [bx,by]
            #Cipher text 1 generation
            C1x=self.k*bx
            C1y=self.k*by
            encripted = '['
            M=[(ord(character)-97) for character in self.msg]
            #Cipher text 2 generation
            for m in M:
                C2x=self.k*Qx+m
                C2y=self.k*Qy+m
                encripted += '['+ str(C1x) + ',' + str(C2x) + '],'
                print([C1x,C2x],encripted)
            print(type(encripted), '--------------------------')
            encripted = encripted[:-1]
            encripted += ']'

            return  encripted

    def decrypt(self,encripted,key):
        encripted = encripted[:-2]
        encripted = encripted[2:]
        print(encripted)
        encripted = encripted.split('],[')
        print(encripted)
        key = int(key)
        decripted = ""
        for e in encripted:
            e = e.split(',')
            print(e)
            Mx=int(e[1])-key*int(e[0])
            if( Mx >= 0):
                decripted+= chr(Mx+97)
            else:
                print("lost value")
        print("The message recieved by reciever is:\t",decripted)
        return decripted           

def main():
    print("Enter value of 'p':")
    p=int(input())
    print("Enter value of 'a':")
    a=int(input())
    print("Enter value of 'b':")
    b=int(input())
    print("Enter the random number 'key' i.e. Private key of Sender (key<p):")
    key=int(input())
    print("Enter the random number 'k' i.e. Private key of Sender (k<p):")
    k=int(input())
    print("Enter the message to be sent:\p")
    m = input()
    mensaje = Gamal2(p,a,b,key,k,m)
    en = mensaje.encrypt()
    print('-----------------------',type(en))
    mensaje.decrypt(en,key)
        
if __name__ == '__main__':
	main()
##real decript_____________
            #print("Value of Cipher text 2 i.e. C2:\t(",C2x,",",C2y,")\p")
    #Decryption