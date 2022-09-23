import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesplazamientoService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getDesplazamientoE(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/desplazamiento/encrypt/${text}&${key}`)
  }
  getDesplazamientoD(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/desplazamiento/desencrypt/${text}&${key}`)
  }
  getDesplazamientoA(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/desplazamiento/analysis/${text}`)
  }
}
