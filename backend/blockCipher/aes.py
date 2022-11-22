import numpy as np
from Crypto.Cipher import AES
from PIL import Image
import PIL
from math import log10, sqrt

class Aes:

  def __init__(self, path,key,modeStr,iv, ctr):
     
    self.path = "backend/classCryptosystems/img/" + path
    self.name = path
    self.key = str.encode(key)
    self.iv = str.encode(iv)
    self.ctr = str.encode(ctr)
    
    if modeStr == 'ECB':
      self.mode = 1
    if modeStr == 'CBC':
      self.mode = 2
    if modeStr == 'CFB':
      self.mode = 3
    if modeStr == 'OFB':
      self.mode = 5
    if modeStr == 'CTR':
      self.mode = 6


  def encrypt(self):
    
    img = Image.open(self.path)
    
    if self.mode ==1:
      img = self.encrypt_image(np.asarray(Image.open(self.path)), self.key, self.mode)
    elif self.mode>1 and self.mode < 6:
      img = self.encrypt_image(np.asarray(Image.open(self.path)), self.key, self.mode, iv=self.iv)
    elif self.mode == 6:
      img = self.encrypt_image(np.asarray(Image.open(self.path)), self.key, self.mode, initial_value=self.ctr)
    
    img = Image.fromarray(img)
    routE = "backend/classCryptosystems/img/" + self.name.split('.')[0] + 'E.png'
    img.save(routE,"PNG")
    img.save("src/assets/img/resultE.jpeg","JPEG")
    psnr = self.PSNR(self.path, routE)
    return psnr

  def decrypt(self):
    img = Image.open(self.path)
    
    if self.mode ==1:
      img = self.decrypt_image(np.asarray(Image.open(self.path)), self.key, self.mode)
    elif self.mode>1 and self.mode < 6:
      img = self.decrypt_image(np.asarray(Image.open(self.path)), self.key, self.mode, iv=self.iv)
    elif self.mode == 6:
      img = self.decrypt_image(np.asarray(Image.open(self.path)), self.key, self.mode, initial_value=self.ctr)
    img = Image.fromarray(img)
    routE = "backend/classCryptosystems/img/hill" + self.file.split('.')[0] + 'E.png'
    img.save("backend/classCryptosystems/img/" + self.name.split('.')[0] + 'D.png',"PNG")
    img.save("src/assets/img/resultD.jpeg","JPEG")
    psnr = self.PSNR(self.path, "backend/classCryptosystems/img/" + self.name.split('.')[0] + 'D.png')
    return psnr
    
  def encrypt_image(self,plain_img_arr, *args, **kwargs):

    if args[1] == AES.MODE_CTR:
        kwargs["nonce"] = b""

    plain_img_arr = self.pad(plain_img_arr, 8)
    
    aes = AES.new(*args, **kwargs)

    shape = plain_img_arr.shape
    plain_img_arr_bytes = plain_img_arr.tobytes()
    encrypted_img_bytes = aes.encrypt(plain_img_arr_bytes)
    cipher_img_arr = np.frombuffer(encrypted_img_bytes, dtype=np.uint8).reshape(shape)

    return cipher_img_arr

  
  def decrypt_image(self,cipher_img_arr, *args, **kwargs):
  
    args = (args[0], args[1])

    if args[1] == AES.MODE_CTR:
        kwargs["nonce"] = b""

    aes = AES.new(*args, **kwargs)

    shape = cipher_img_arr.shape
    cipher_img_arr_bytes = cipher_img_arr.tobytes()
    decrypted_img_bytes = aes.decrypt(cipher_img_arr_bytes)
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
  
  def PSNR(self,original_p, cipher_p):
    original =PIL.Image.open(original_p)
    compressed = PIL.Image.open(cipher_p)
    original = np.array(original)
    compressed = np.array(compressed)
    if original.shape[0] != compressed.shape[0]:
        n = compressed.shape[0] - original.shape[0]
        compressed = compressed[0:(compressed.shape[0] - n),:,:]
        
    mse = np.mean((original - compressed) ** 2)
    if(mse == 0):  # MSE is zero means no noise is present in the signal .
                # Therefore PSNR have no importance.
        return 100
    max_pixel = 255.0
    psnr = 20 * log10(max_pixel / sqrt(mse))
    return psnr