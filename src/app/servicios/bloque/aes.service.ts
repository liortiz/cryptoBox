import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AesService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getAesE(text:string,key:string,modeStr:string,iv:string,ctr:string):Observable<any>{
    if (iv == ''){
      iv = this.getRandomKey()
    };
    if (ctr == ''){
      ctr = this.getRandomKey()
    };
    console.log('encriptandoo')
    return this.http.get(`${this.baseURL}/aes/encrypt/${text}&${key}&${modeStr}&${iv}&${ctr}`)
  }
  getAesD(text:string,key:string,modeStr:string,iv:string,ctr:string):Observable<any>{
    if (iv == ''){
      iv = this.getRandomKey()
    };
    if (ctr == ''){
      ctr = this.getRandomKey()
    };
    console.log('aes')
    return this.http.get(`${this.baseURL}/aes/decrypt/${text}&${key}&${modeStr}&${iv}&${ctr}`)
  }
  getRandomKey():string{
    var alphabet2 = "qwertyuiopasdfghjklzxcvbnm".split("")
    let largo = 16
    let generated =""
    for (var i =0; i <largo ;i++ ){
      generated += alphabet2[Math.floor(Math.random() * alphabet2.length)]}
    generated.replace(",","")
    return generated
  }

  // asciiList(text:string){
  //   var liskey =[]
  //   for(var i=0;i<text.length;i++){
  //     liskey.push(text.charCodeAt(i))
  //   }
  //   return liskey
  // }

  }
