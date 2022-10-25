import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TdesService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  gettdesE(text:string,key:string,modeStr:string,iv:string,ctr:string):Observable<any>{
    if (iv == ''){
      iv = 'h'
    };
    if (ctr == ''){
      ctr = 'h'
    };
    console.log('enc')
    return this.http.get(`${this.baseURL}/tdes/encrypt/${text}&${key}&${modeStr}&${iv}&${ctr}`)
  }
  gettdesD(text:string,key:string,modeStr:string,iv:string,ctr:string):Observable<any>{
    if (iv == ''){
      iv = 'h'
    };
    if (ctr == ''){
      ctr = 'h'
    };
    console.log('des')
    return this.http.get(`${this.baseURL}/tdes/decrypt/${text}&${key}&${modeStr}&${iv}&${ctr}`)
  }
  gettdesA(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/tdes/analysis/${text}`)
  }
}
