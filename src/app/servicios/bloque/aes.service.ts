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
      iv = 'h'
    };
    if (ctr == ''){
      ctr = 'h'
    };
    console.log('enc')
    return this.http.get(`${this.baseURL}/Aes/encrypt/${text}&${key}&${modeStr}&${iv}&${ctr}`)
  }
  getAesD(text:string,key:string,modeStr:string,iv:string,ctr:string):Observable<any>{
    if (iv == ''){
      iv = 'h'
    };
    if (ctr == ''){
      ctr = 'h'
    };
    console.log('des')
    return this.http.get(`${this.baseURL}/Aes/decrypt/${text}&${key}&${modeStr}&${iv}&${ctr}`)
  }
  getAesA(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/Aes/analysis/${text}`)
  }
}

  // asciiList(text:string){
  //   var liskey =[]
  //   for(var i=0;i<text.length;i++){
  //     liskey.push(text.charCodeAt(i))
  //   }
  //   return liskey
  // }


