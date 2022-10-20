import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class afinService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getafinE(text:string,a:string,b:string):Observable<any>{
    return this.http.get(`${this.baseURL}/afin/encrypt/${text}&${a}&${b}`)
  }
  getafinD(text:string,a:string,b:string):Observable<any>{
    return this.http.get(`${this.baseURL}/afin/decrypt/${text}&${a}&${b}`)
  }
  getafinA(text:string,fcl:string,fdl:string,scl:string,sdl:string):Observable<any>{
    return this.http.get(`${this.baseURL}/afin/analysis/${text}&${fcl}&${fdl}&${scl}&${sdl}`)
  }
  getafinRandom():Observable<any>{
    return this.http.get(`${this.baseURL}/afin/random`)
  }
}
