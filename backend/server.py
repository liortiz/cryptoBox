from flask import Flask, jsonify
from flask_cors import CORS
from flask import render_template

from classCryptosystems.afin import afin
from classCryptosystems.desplazamiento import Desplazamiento
from classCryptosystems.hill import hill
from classCryptosystems.sustitucion import Sustitucion
from classCryptosystems.permutacion import permutacion
from classCryptosystems.vigenere import Vigenere


from blockCipher.tdes import TDes
from blockCipher.aes import Aes
from blockCipher.sdes import Sdes
from blockCipher.gamma import encrypt_gammaP,graphing,decrypt_gammaP


from publicKey.rabin import Rabin
from publicKey.rsa import RSA
from publicKey.gamal import Gamal
from publicKey.gamal2 import Gamal2

from utils.randomkeys import Randomkeys

app = Flask(__name__)
CORS(app)
cors = CORS(app,resources={
    r"/*":{
        "origins": "*"
    }
})
app.config["DEBUG"] = True
app.debug = True

def preparacion(data):
    return (''.join(char for char in data if char.isalnum())).lower()

# ------------------------------------------------------------------
# ---------------------------- CLASICOS ----------------------------
# ------------------------------------------------------------------


@app.route('/', methods=['GET'])
def root():
    return render_template("index.html")

# AFIN
@app.route('/afin/encrypt/<data>&<a>&<b>', methods=['GET'])
def afin_encript(data,a,b):
    data = preparacion(data)
    a = int(a)
    b = int(b)
    textEncrypt =  afin(data,a,b).encrypt()
    response = jsonify({'TextoEncriptado': textEncrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/afin/decrypt/<data>&<a>&<b>', methods=['GET'])
def afin_decrypt(data,a,b):
    data = preparacion(data)
    a = int(a)
    b = int(b)
    textDecrypt =  afin(data,a,b).decrypt()
    response = jsonify({'TextoDesencriptado': textDecrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/afin/analysis/<data>&<fcl>&<fdl>&<scl>&<sdl>', methods=['GET'])
def afin_analisis(data,fcl, fdl, scl, sdl):
    data = preparacion(data)
    analisis =  afin(data,1,1).cryptanalysis(fcl, fdl, scl, sdl)
    response = jsonify({'Analisis': analisis})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# DESPLAZAMIENTO
@app.route('/desplazamiento/encrypt/<data>&<p>', methods=['GET'])
def desplazamiento_encript(data,p):
    data = preparacion(data)
    p = int(p)
    textEncrypt =  Desplazamiento(data,p).encrypt()
    response = jsonify({'TextoEncriptado': textEncrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/desplazamiento/decrypt/<data>&<p>', methods=['GET'])
def desplazamiento_decrypt(data,p):
    data = preparacion(data)
    p = int(p)
    textDecrypt =  Desplazamiento(data,p).decrypt()
    response = jsonify({'TextoDesencriptado': textDecrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/desplazamiento/analysis/<data>', methods=['GET'])
def desplazamiento_analisis(data):
    data = preparacion(data)
    k =  Desplazamiento(data,1).cryptanalysis()
    analisis = Desplazamiento(data,int(k)).decrypt()
    response = jsonify({'Analisis': analisis})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# HILL
@app.route('/hill/encrypt/<data>&<p>&<n>', methods=['GET'])
def hill_encript(data,p,n):
    psnr =  hill(data,p,int(n)).encrypt()
    response = jsonify({'psnr': psnr})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/hill/decrypt/<data>&<p>&<n>', methods=['GET'])
def hill_decrypt(data,p,n):
    psnr =  hill(data,p,int(n)).decrypt()
    response = jsonify({'psnr': psnr})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/hill/analysis/<plain_text>&<cipher_text>', methods=['GET'])
def hill_analisis(plain_text, cipher_text):
    analisis =  hill(plain_text, '3,4,0,1',2).cryptanalysis(plain_text, cipher_text)
    response = jsonify({'Analisis': analisis})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# PERMUTACION
@app.route('/permutacion/encrypt/<data>&<p>', methods=['GET'])
def permutacion_encript(data,p):
    data = preparacion(data)
    textEncrypt =  permutacion(data,p).encrypt()
    print("server"+textEncrypt)
    response = jsonify({'TextoEncriptado': textEncrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/permutacion/decrypt/<data>&<p>', methods=['GET'])
def permutacion_decrypt(data,p):
    textDecrypt =  permutacion(data,p).decrypt()
    response = jsonify({'TextoDesencriptado': textDecrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/permutacion/analysis/<data>', methods=['GET'])
def permutacion_analisis(data):
    q = "01"
    analisis =  ','.join(permutacion(data,q).cryptanalysis())
    response = jsonify({'Analisis': analisis})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# SUSTITUCION
@app.route('/sustitucion/encrypt/<data>&<p>', methods=['GET'])
def sustitution_encript(data,p):
    textEncrypt =  Sustitucion(data,p).encrypt()
    response = jsonify({'TextoEncriptado': textEncrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/sustitucion/decrypt/<data>&<p>', methods=['GET'])
def sustitution_decrypt(data,p):
    textDecrypt =  Sustitucion(data,p).decrypt()
    response = jsonify({'TextoDesencriptado': textDecrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/sustitucion/analysis/<data>', methods=['GET'])
def sustitution_analisis(data):
    analisis =  Sustitucion(data,1).analysis()
    response = jsonify({'Analisis': analisis})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
# VIGENERE

@app.route('/vigenere/encrypt/<data>&<p>', methods=['GET'])
def vigenere_encript(data,p):
    textEncrypt =  Vigenere(data,p).encrypt()
    response = jsonify({'TextoEncriptado': textEncrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/vigenere/decrypt/<data>&<p>', methods=['GET'])
def vigenere_decrypt(data,p):
    print(data)
    data = preparacion(data)
    textDecrypt =  Vigenere(data,p).decrypt()
    response = jsonify({'TextoDesencriptado': textDecrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/vigenere/analysis/<data>', methods=['GET'])
def vigenere_analisis(data):
    k =  Vigenere(data,'hola').cryptanalysis(30)
    analisis = Vigenere(data,k).decrypt()
    response = jsonify({'Analisis': analisis})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



# RANDOM KEYS
@app.route('/afin/random', methods=['GET'])
def afin_random():
    key = Randomkeys.afinRandomKey()
    response = jsonify({'Key': key})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/permutacion/random', methods=['GET'])
def permutacion_random():
    key = Randomkeys.permutacionRandomKey()
    response = jsonify({'Key': key})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/vigenere/random', methods=['GET'])
def vigenere_random():
    key = Randomkeys.vigenereRandomKey()
    response = jsonify({'Key': key})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# ----------------------------------------------------------------
# ---------------------------- BLOQUE ----------------------------
# ----------------------------------------------------------------

# AES
@app.route('/aes/encrypt/<path>&<k>&<modeStr>&<iv>&<ctr>', methods=['GET'])
def aes_encript(path, k, modeStr, iv, ctr):
    psnr =  Aes(path, k, modeStr, iv, ctr).encrypt()
    response = jsonify({'psnr': psnr})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/aes/decrypt/<path>&<k>&<modeStr>&<iv>&<ctr>', methods=['GET'])
def aes_decrypt(path, k, modeStr, iv, ctr):
    psnr =  Aes(path, k, modeStr, iv, ctr).decrypt()
    response = jsonify({'psnr': psnr})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# GAMMA
@app.route('/gamma/encrypt/<text>&<x>&<y>&<p>', methods=['GET'])
def gamma_encript(text, x, y, p):
    fig, matrix = graphing(int(x), int(y), p)
    fig.update_layout(
        margin=dict(l=20, r=20, t=20, b=20),
        paper_bgcolor="yellowgreen",
    )
    fig.write_image('backend/blockCipher/gamma/gp.png')
    fig.write_image('src/assets/img/gp.png')
    cipher_text, percentage = encrypt_gammaP(text, matrix)
    cipher_text = str(cipher_text).strip('[]')
    response = jsonify({'TextoEncriptado': [cipher_text], 'porcentaje': percentage})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/gamma/decrypt/<text>&<x>&<y>&<p>', methods=['GET'])
def gamma_decrypt(text, x, y, p):
    fig, matrix = graphing(int(x), int(y), p)
    text  = list(eval(text))
    print(text)
    textDecrypt = decrypt_gammaP(text, matrix)
    response = jsonify({'TextoDesncriptado': str(textDecrypt)})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# SDES
@app.route('/sdes/encrypt/<text>&<k>', methods=['GET'])
def sdes_encript(text, k):
    textEncrypt =  Sdes(text, k).encrypt()
    response = jsonify({'TextoEncriptado': textEncrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/sdes/decrypt/<text>&<k>', methods=['GET'])
def sdes_decrypt(text, k):
    textDecrypt =  Sdes(text, k).decrypt()
    response = jsonify({'TextoDesncriptado': textDecrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# TDES
@app.route('/tdes/encrypt/<path>&<k>&<modeStr>&<iv>&<ctr>', methods=['GET'])
def tdes_encript(path, k, modeStr, iv, ctr):
    psnr =  TDes(path, k, modeStr, iv, ctr).encrypt()
    response = jsonify({'psnr': psnr})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/tdes/decrypt/<path>&<k>&<modeStr>&<iv>&<ctr>', methods=['GET'])
def tdes_decrypt(path, k, modeStr, iv, ctr):
    textDecrypt =  TDes(path, k, modeStr, iv, ctr).decrypt()
    response = jsonify({'TextoDesncriptado': 'textDecrypt'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# -----------------------------------------------------------------
# ------------------------- LLAVE PUBLICA -------------------------
# -----------------------------------------------------------------

# RABIN
@app.route('/rabin/encrypt/<text>&<n>', methods=['GET'])
def rabin_encript(text,n):
    textEncrypt =  Rabin().encrypt(text,n)
    response = jsonify({'TextoEncriptado': textEncrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rabin/decrypt/<text>&<p>', methods=['GET'])
def rabin_decrypt(text,p):
    textDecrypt =  Rabin().decrypt(text,p)
    response = jsonify({'TextoDesencriptado': textDecrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# @app.route('/rabin/getkey/<p1>&<p2>', methods=['GET'])
# def rabin_key(p1,p2):
#     key =  Rabin().generate_keypair(int(p1),int(p2))
#     response = jsonify({'key': key})
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

# RSA
@app.route('/rsa/encrypt/<text>&<pk>', methods=['GET'])
def rsa_encript(text,pk):
    textEncrypt =  RSA().encrypt(pk,text)
    response = jsonify({'TextoEncriptado': textEncrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rsa/decrypt/<text>&<pk>', methods=['GET'])
def rsa_decrypt(text,pk):
    textDecrypt =  RSA().decrypt(pk,text)
    response = jsonify({'TextoDesencriptado': textDecrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/rsa/getkey/<p1>&<p2>', methods=['GET'])
def rsa_key(p1,p2):
    key =  RSA().generate_keypair(int(p1),int(p2))
    response = jsonify({'key': key})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# ELGAMAL
@app.route('/gamal/encrypt/<msg>&<q>&<h>&<g>', methods=['GET'])
def gamal_encript(msg,q,h,g):
    textEncrypt,p =  Gamal().encrypt(msg,q,h,g)
    response = jsonify({'TextoEncriptado': textEncrypt,'p':p})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/gamal/decrypt/<msg>&<q>&<h>&<g>', methods=['GET'])
def gamal_decrypt(msg,q,h,g):
    textDecrypt =  Gamal().decrypt(msg,q,h,g)
    response = jsonify({'TextoDesencriptado': textDecrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/gamal/key', methods=['GET'])
def gamal_key():
    q,g,k,h =  Gamal().gen_values()
    response = jsonify({'q':q,'g':g,'k':k,'h':h})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# ELGAMAL2
@app.route('/gamal2/encrypt/<p>&<a>&<b>&<key>&<k>&<msg>', methods=['GET'])
def gamal2_encript(p,a,b,key,k,msg):
    textEncrypt =  Gamal2(p,a,b,key,k,msg).encrypt()
    response = jsonify({'TextoEncriptado': textEncrypt,'p':p})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/gamal2/decrypt/<msg>&<key>', methods=['GET'])
def gamal2_decrypt(key,msg):
    textDecrypt =  Gamal2(1,1,1,1,1,'a').decrypt(msg,key)
    response = jsonify({'TextoDesencriptado': textDecrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/gamal2/key', methods=['GET'])
def gamal2_key():
    q,g,k,h =  Gamal2().gen_values()
    response = jsonify({'q':q,'g':g,'k':k,'h':h})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(debug=True)
