import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class rabinService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getrabinE(text:string,n:string):Observable<any>{
    return this.http.get(`${this.baseURL}/rabin/encrypt/${text}&${n}`)
  }
  getrabinD(text:string,p:string):Observable<any>{
    return this.http.get(`${this.baseURL}/rabin/decrypt/${text}&${p}`)
  }
}
