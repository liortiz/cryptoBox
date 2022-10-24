from fileinput import filename
from urllib import request
from flask import Flask, jsonify, request

from classCryptosystems.afin import afin
from classCryptosystems.desplazamiento import Desplazamiento
from classCryptosystems.hill import hill
from classCryptosystems.sustitucion import Sustitucion
from classCryptosystems.permutacion import permutacion
from classCryptosystems.vigenere import Vigenere

from utils.randomkeys import Randomkeys
from flask_cors import CORS


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
    textEncrypt =  hill(data,p,int(n)).encrypt()
    response = jsonify({'TextoEncriptado': "hill"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/hill/decrypt/<data>&<p>', methods=['GET'])
def hill_decrypt(data,p):
    textDecrypt =  hill(data,p).decrypt()
    response = jsonify({'TextoDesencriptado': textDecrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/hill/analysis/<data>', methods=['GET'])
def hill_analisis(data):
    analisis =  hill(data,1).cryptanalysis()
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
    analisis =  Sustitucion(data,1).cryptanalysis()
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


@app.route('/aes/encrypt/<data>&<p>', methods=['GET'])
def aes_encript(data,p):
    textEncrypt =  hill(data,p,2).encrypt()
    response = jsonify({'TextoEncriptado': "hill"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



if __name__ == "__main__":
    app.run(debug=True)