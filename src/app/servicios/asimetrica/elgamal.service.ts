import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class elgamalService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getelgamalE(text:string,key:string,modeStr:string,iv:string,ctr:string):Observable<any>{
    if (iv == ''){
      iv = this.getRandomKey()
    };
    if (ctr == ''){
      ctr = this.getRandomKey()
    };
    console.log('enc')
    return this.http.get(`${this.baseURL}/elgamal/encrypt/${text}&${key}&${modeStr}&${iv}&${ctr}`)
  }
  getelgamalD(text:string,key:string,modeStr:string,iv:string,ctr:string):Observable<any>{
    if (iv == ''){
      iv = this.getRandomKey()
    };
    if (ctr == ''){
      ctr = this.getRandomKey()
    };
    console.log('enc')
    return this.http.get(`${this.baseURL}/elgamal/decrypt/${text}&${key}&${modeStr}&${iv}&${ctr}`)
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
}
