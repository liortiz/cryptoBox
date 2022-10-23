import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VigenereService {

  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getVigenereE(text:string,key:string):Observable<any>{
    console.log(text);
    console.log(key);
    return this.http.get(`${this.baseURL}/vigenere/encrypt/${text}&${key}`)
  }
  getVigenereD(text:string,key:string):Observable<any>{
    console.log(text);
    return this.http.get(`${this.baseURL}/vigenere/decrypt/${text}&${key}`)
  }
  getVigenereA(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/vigenere/analysis/${text}`)
  }
  getVigenereRandom():Observable<any>{
    return this.http.get(`${this.baseURL}/vigenere/random`)
  }
}
