import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SustitucionService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getSustitucionE(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/sustitucion/encrypt/${text}&${key}`)
  }
  getSustitucionD(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/sustitucion/decrypt/${text}&${key}`)
  }
  getSustitucionA(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/sustitucion/analysis/${text}`)
  }
}
