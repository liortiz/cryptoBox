import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class rsaService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getrsaE(text:string,pk:string):Observable<any>{
    return this.http.get(`${this.baseURL}/rsa/encrypt/${text}&${pk}`)
  }
  getrsaD(text:string,pk:string):Observable<any>{
    return this.http.get(`${this.baseURL}/rsa/decrypt/${text}&${pk}`)
  }
}
