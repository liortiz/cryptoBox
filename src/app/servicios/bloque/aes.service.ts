import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AesService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getAesE(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/aes/encrypt/${text}&${key}`)
  }
  getAesD(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/aes/desencrypt/${text}&${key}`)
  }
  getAesA(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/aes/analysis/${text}`)
  }
}

