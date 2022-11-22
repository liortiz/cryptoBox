import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Gamal2Service {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getgamal2E(p:string,a:string,b:string,key:string,k:string,msg:string):Observable<any>{
    return this.http.get(`${this.baseURL}/gamal2/encrypt/${p}&${a}&${b}&${key}&${k}&${msg}`)
  }
  getgamal2D(p:string,a:string,b:string,key:string,k:string,msg:string):Observable<any>{
    return this.http.get(`${this.baseURL}/gamal2/decrypt/${p}&${a}&${b}&${key}&${k}&${msg}`)
  }
  getgamal2K():Observable<any>{
    return this.http.get(`${this.baseURL}/gamal2/key`)
  }
}

