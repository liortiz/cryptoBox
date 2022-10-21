from flask import Flask, jsonify

from classCryptosystems.afin import afin
from classCryptosystems.desplazamiento import Desplazamiento
from classCryptosystems.hill import hill
from classCryptosystems.permutacion import permutacion

from utils.randomkeys import Randomkeys

app = Flask(__name__)
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
    analisis =  afin(data,1).cryptanalysis(fcl, fdl, scl, sdl)
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
    analisis =  Desplazamiento(data,1).cryptanalysis()
    response = jsonify({'Analisis': analisis})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# HILL 
@app.route('/hill/encrypt/<data>&<p>&<n>', methods=['GET'])
def hill_encript(data,p,n):
    textEncrypt =  hill(data,p,int(n)).encrypt()
    response = jsonify({'TextoEncriptado': textEncrypt})
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
@app.route('/permutacion/encript/<data>&<p>', methods=['GET'])
def permutacion_encript(data,p):
    textEncrypt =  permutacion(data,p).encrypt()
    response = jsonify({'TextoEncriptado': textEncrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/permutacion/decrypt/<data>&<p>', methods=['GET'])
def permutacion_decrypt(data,p):
    textDesncrypt =  permutacion(data,p).decrypt()
    response = jsonify({'Textodecryptado': textDesncrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# to do
@app.route('/permutacion/analisis/<plain_text>&<cipher_text>', methods=['GET'])
def permutacion_analisis(data):
    analysis =  permutacion(data,[]).cryptanalysis()
    response = jsonify({'Analisis': analysis})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# SUSTITUCION 
# VIGENERE

# RANDOM KEYS
@app.route('/afin/random', methods=['GET'])
def afin_random():
    key = Randomkeys.afinRandomKey()
    response = jsonify({'Key': key})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(debug=True)