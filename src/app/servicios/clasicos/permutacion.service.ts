import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermutacionService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getPermutacionE(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/permutacion/encrypt/${text}&${key}`)
  }
  getPermutacionD(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/permutacion/decrypt/${text}&${key}`)
  }
  getPermutacionA(text:string,key:string):Observable<any>{
    console.log(text)
    console.log(key)
    return this.http.get(`${this.baseURL}/permutacion/analysis/${text}`)
  }
  getPermutacionRandom():Observable<any>{
    return this.http.get(`${this.baseURL}/permutacion/random`)
  }
}
