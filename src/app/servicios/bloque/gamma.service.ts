import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GammaService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getgammaE(text:string,x:string,y:string,p:string):Observable<any>{
    return this.http.get(`${this.baseURL}/gamma/encrypt/${text}&${x}&${y}&${p}`)
  }
  getgammaD(text:string,x:string,y:string,p:string):Observable<any>{
    return this.http.get(`${this.baseURL}/gamma/decrypt/${text}&${x}&${y}&${p}`)
  }
  getgammaA(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/gamma/analysis/${text}`)
  }
}

