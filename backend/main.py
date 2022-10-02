@app.route('/hill/encrypt/<data>&<p>', methods=['GET'])
def desplazamineto_encript(data,p):
    data = preparacion(data)
    p = int(p)
    textEncrypt =  hill(data,p).encrypt()
    response = jsonify({'TextoEncriptado': textEncrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/hill/desencrypt/<data>&<p>', methods=['GET'])
def desplazamineto_desencrypt(data,p):
    data = preparacion(data)
    p = int(p)
    textDesencrypt =  hill(data,p).desencrypt()
    response = jsonify({'TextoDesencriptado': textDesencrypt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/hill/analysis/<data>', methods=['GET'])
def desplazamineto_analisis(data):
    data = preparacion(data)
    analisis =  hill(data,1).cryptanalysis()
    response = jsonify({'Analisis': analisis})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response