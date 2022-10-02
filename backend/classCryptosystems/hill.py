from base64 import encode
from math import ceil, floor
import re
import numpy as np
import PIL.Image
import regex as re
from math import gcd
from itertools import combinations

class  hill:

    def __init__(self,file,k):
        self.file = file
        self.k = k

    def encode_by_k(self, matrix_blocks, encrypted_matrix, encrypt=True):
        # Multiplica los bloques de la matriz por k(llave) en mod 256
        mult = []
        if encrypt: #Modo encriptar 

            for i in range(len(matrix_blocks)):
                aux = np.resize(matrix_blocks[i], (1,len(matrix_blocks[i])))
                mult.append(np.dot(aux,self.k))


            mult_mod_256 = (np.array(mult))%256
            mult_mod_256 = np.resize(mult_mod_256,encrypted_matrix.shape)
            mult_mod_256 = mult_mod_256.T #Transponer matriz codificada
            return mult_mod_256
        else: #Modo desencriptar
            k_i = self.key_inverse()
            for i in range(len(matrix_blocks)):
                aux = np.resize(matrix_blocks[i], (1,len(matrix_blocks[i])))
                mult.append(np.dot(aux,k_i))


            mult_mod_256 = (np.array(mult))%256
            mult_mod_256 = np.resize(mult_mod_256,encrypted_matrix.shape)
            return mult_mod_256
  

    def encode_matrix(self,arr,encrypt=True):
        '''Dividir la matriz original en submatrices de 1 x n donde n es el tamaño de la clave'''
        rows,cols = arr.shape
        n = self.k.shape[0]
        encrypted_matrix = arr.copy()#matriz encriptada
        flat_matrix = arr.flatten() #Aplanar la matriz
        matrix_blocks = np.array_split(flat_matrix,ceil((rows*cols)/n))# dividir la matriz en bloques 1 x n
        size_last_block = abs(len(matrix_blocks[-1])-len(matrix_blocks[0])) 

        if size_last_block != 0: # verificar si todos los bloques quedaron del mismo tamaño, sino llenar con ceros
            aux = np.concatenate((matrix_blocks[-1],np.zeros(size_last_block,dtype=int)))
            matrix_blocks = matrix_blocks[:len(matrix_blocks)-1]
            matrix_blocks[-1] = aux

        # Multiplicar los bloques por k
        if encrypt: #Modo encriptar
            encrypted_matrix = self.encode_by_k(matrix_blocks,encrypted_matrix)
            return encrypted_matrix
        else: #Modo desencryptar
            decrypted_matrix = arr.copy()
            decrypted_matrix = self.encode_by_k(matrix_blocks,decrypted_matrix,False)
            return decrypted_matrix



    def encrypt(self):
        image = PIL.Image.open(self.file)
        bw_image = image.convert("L") #imagen a blanco y negro
        arr = np.array(bw_image) # Convertir imagen en matriz
        encrypted_matrix = self.encode_matrix(arr) #Matriz codificada
        encrypted_img = PIL.Image.fromarray(encrypted_matrix)
        return encrypted_img

#-------------------------------------------------------------------------------------------------------------------------------------
    def key_inverse(self):
        #Hallar inversa de la llave en Z_256

        adj = (np.linalg.inv(self.k).T * np.linalg.det(self.k)).T
        d = pow( int(np.linalg.det(self.k)),-1,256)
        inverse = (d * adj) % 256
        return inverse

    def matrix_inverse(self,m,p):
        ''' Calcula la matriz inversa m en Zp'''

        adj = (np.linalg.inv(m).T * np.linalg.det(m)).T
        inv_d = pow(int(np.linalg.det(m)),-1,p) 
        inverse = (inv_d * adj) % p
        return inverse

    
    def desencrypt(self,encrypted_img):
        encrypted_matrix = (np.array(encrypted_img)).T
        decrypted_matrix = self.encode_matrix(encrypted_matrix,False)
        desencrypted_img = PIL.Image.fromarray(decrypted_matrix)
        return desencrypted_img
        
        

        
        
        # print(pow(3,-1,256)) -> hallar inverso de 3 en z256
 #----------------------------------------------------------------------------------------------------------------------------------------
    def textCleaning(self,plain_text):
        '''Codificar texto plano'''
        text = plain_text.lower()
        text = re.sub(' +', '', text) #Quitar espacios
        print(text)
        encoded_text = np.array([ord(char) - 97 for char in text])

        return encoded_text

    def det(self,m,p):
        p1 = (m[0][0] * m[1][1])%p
        p2 = (m[1][0] * m[0][1])%p
        return (p1-p2)%p






    def buildingMatrix(self,encoded_text):

        encoded_matrix = []
        possible_key_sizes = [2,3,4]

        for key in possible_key_sizes:
            

            matrix_blocks = np.array_split(encoded_text,ceil(len(encoded_text)/key))
            size_last_block = abs(len(matrix_blocks[-1])-len(matrix_blocks[0])) 

            if size_last_block != 0: # verificar si todos los bloques quedaron del mismo tamaño, sino llenar con ceros
                aux = np.concatenate((matrix_blocks[-1],np.zeros(size_last_block)))
                matrix_blocks[-1] = aux
            encoded_matrix.append(np.array(matrix_blocks))

        return encoded_matrix           

        
    def find_k(self,p_blocks,c_blocks):
        ''' Encuentra las posibles llaves'''
        
        l2 = [] #key length 2
        l3  = [] #key length 3
        l4 = [] #key length 4

        k2_pairs_plain = list(combinations(p_blocks[0],2)) # 2-grams
        k2_pairs_cipher = list(combinations(c_blocks[0],2))

        k3_pairs_plain = list(combinations(p_blocks[1],3)) # 3-grams
        k3_pairs_cipher = list(combinations(c_blocks[1],3))

        k4_pairs_plain = list(combinations(p_blocks[2],4)) # 4-grams
        k4_pairs_cipher = list(combinations(c_blocks[2],4))

        matrix_pairs_plain_k2 = [np.array([a,b]) for (a,b) in k2_pairs_plain]
        matrix_pairs_cipher_k2 = [np.array([a,b]) for (a,b) in k2_pairs_cipher]

        matrix_pairs_plain_k3 = [np.array([a,b,c]) for (a,b,c) in k3_pairs_plain]
        matrix_pairs_cipher_k3 = [np.array([a,b,c]) for (a,b,c) in k3_pairs_cipher]

        matrix_pairs_plain_k4 = [np.array([a,b,c,d]) for (a,b,c,d) in k4_pairs_plain]
        matrix_pairs_cipher_k4 = [np.array([a,b,c,d]) for (a,b,c,d) in k4_pairs_cipher]

        for i in range(len( matrix_pairs_plain_k2)):
            #Finding all possible keys of lenght 2


            M1 = matrix_pairs_plain_k2[i]
            M2 = matrix_pairs_cipher_k2[i]

            d = int(np.linalg.det(M1))


            if gcd(d,26)==1:

                k = np.dot(self.matrix_inverse(M1,26),M2) % 26

                l2.append(k)


        for i in range(len( matrix_pairs_plain_k3)):
            #Finding all possible keys of lenght 3


            M1 = matrix_pairs_plain_k3[i]
            M2 = matrix_pairs_cipher_k3[i]

            d = int(np.linalg.det(M1))


            if gcd(d,26)==1:

                k = np.dot(self.matrix_inverse(M1,26),M2) % 26

                l3.append(k)




        for i in range(len( matrix_pairs_plain_k4)):
            #Finding all possible keys of lenght 4


            M1 = matrix_pairs_plain_k4[i]
            M2 = matrix_pairs_cipher_k4[i]

            d = int(np.linalg.det(M1))


            if gcd(d,26)==1:

                k = np.dot(self.matrix_inverse(M1,26),M2) % 26

                l4.append(k)

        
        return l2,l3,l4

 
 
    def cryptanalysis(self, plain_text, cipher_text):

        '''Realiza el criptoanalisis del cifrado Hill a partir de un texto plano y su cifrado
        Devuelve las posibles llaves en tamaño 2,3 y 4.'''
        plaintc = self.textCleaning(plain_text)
        ciphertc = self.textCleaning(cipher_text)

        print(plaintc)
        print(ciphertc)

        plainTextArrays = self.buildingMatrix(plaintc)
        cipherTextArrays = self.buildingMatrix(ciphertc)

        l2,l3,l4 = self.find_k(plainTextArrays,cipherTextArrays)

        print("Las posibles llave de tamaño 2 son: ")
        for l in l2:
            print(l)
            print("---------------------------------------------------------------------------")

        print("Las posibles llave de tamaño 3 son: ")
        for l in l3:
            print(l)
            print("---------------------------------------------------------------------------")

        print("Las posibles llave de tamaño 4 son: ")
        for l in l4:
            print(l)
            print("---------------------------------------------------------------------------")











        
        