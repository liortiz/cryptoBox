import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as AES from 'aes-js';
import { NONE_TYPE } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AesService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getAesE(text:string,key:string):Observable<any>{
    var integerkey = this.asciiList(key)
    var textBytes = AES.utils.utf8.toBytes(text);
    // The counter is optional, and if omitted will begin at 1
    var aesCtr = new AES.ModeOfOperation.ctr(integerkey, new AES.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);

    // To print or store the binary data, you may convert it to hex
    var encryptedHex = JSON.stringify(AES.utils.hex.fromBytes(encryptedBytes));
    var response = Observable.create((observer) => { observer.TextoEncriptado(encryptedHex); });
    return response
  }
  getAesD(text:string,key:string):string{
    return this.http.get(`${this.baseURL}/aes/desencrypt/${text}&${key}`)
  }
  getAesA(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/aes/analysis/${text}`)
  }

  asciiList(text:string){
    var liskey =[]
    for(var i=0;i<text.length;i++){
      liskey.push(text.charCodeAt(i))
    }
    return liskey
  }
}

