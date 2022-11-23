import numpy as np
from Crypto.PublicKey import ElGamal

class Gamal:

  def __init__(self, path,key,a,q, ctr):
     
    self.path = "backend/publicKey/txt/" + path
    self.name = path
    self.key = int(key)
    self.q = int(q) # nuestro numero semi primo
    self.a = int(a) # nuestro numero e Z_q
    self.ctr = str.encode(ctr)
    
    if modeStr == 'Elliptic curves':
      self.mode = 1
    if modeStr == 'KP':
      self.mode = 2


  def encrypt(self):
    txt = open(self.path,"r").read().lower()
    #process
    Epath = "backend/publicKey/txt/" + self.name.split('.')[0] + 'E.txt'
    txt2 = open(Epath, "w")
    return txt2

  def decrypt(self):
    img = Image.open(self.path)
    
    if self.mode ==1:
      img = self.decrypt_image(np.asarray(Image.open(self.path)), self.key, self.mode)
    elif self.mode>1 and self.mode < 6:
      img = self.decrypt_image(np.asarray(Image.open(self.path)), self.key, self.mode, iv=self.iv)
    elif self.mode == 6:
      img = self.decrypt_image(np.asarray(Image.open(self.path)), self.key, self.mode, initial_value=self.ctr)
    img = Image.fromarray(img)
    img.save("backend/classCryptosystems/img/" + self.name.split('.')[0] + 'D.png',"PNG")
    img.save("src/assets/img/resultD.jpeg","JPEG")
    return img
    
  def encrypt_image(self,plain_img_arr, *args, **kwargs):

    if args[1] == elgamal.MODE_CTR:
        kwargs["nonce"] = b""

    plain_img_arr = self.pad(plain_img_arr, 8)
    
    elgamal = elgamal.new(*args, **kwargs)

    shape = plain_img_arr.shape
    plain_img_arr_bytes = plain_img_arr.tobytes()
    encrypted_img_bytes = elgamal.encrypt(plain_img_arr_bytes)
    cipher_img_arr = np.frombuffer(encrypted_img_bytes, dtype=np.uint8).reshape(shape)

    return cipher_img_arr

  
  def decrypt_image(self,cipher_img_arr, *args, **kwargs):
  
    args = (args[0], args[1])

    if args[1] == elgamal.MODE_CTR:
        kwargs["nonce"] = b""

    elgamal = elgamal.new(*args, **kwargs)

    shape = cipher_img_arr.shape
    cipher_img_arr_bytes = cipher_img_arr.tobytes()
    decrypted_img_bytes = elgamal.decrypt(cipher_img_arr_bytes)
    plain_img_arr = np.frombuffer(decrypted_img_bytes, dtype=np.uint8).reshape(shape)

    plain_img_arr = self.unpad(plain_img_arr)

    return plain_img_arr

  def pad(self,img_arr, block_size):

    shape = img_arr.shape
    num_pad_rows = block_size - (shape[0] % block_size)
    pad_shape = (num_pad_rows,) + shape[1:]
    pad = np.full(pad_shape, num_pad_rows, dtype=np.uint8)
    padded_arr = np.vstack((img_arr, pad))
    
    return padded_arr
  
  def unpad(self,img_arr):
  
      if len(img_arr.shape) == 3:
          num_pad_rows = int(img_arr[-1, -1, -1])
          plain_img_arr = img_arr[:-num_pad_rows, :, :]
      else:
          num_pad_rows = int(img_arr[-1, -1])
          plain_img_arr = img_arr[:-num_pad_rows, :]
  
      return plain_img_arr

