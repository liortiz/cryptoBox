import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class hillService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  gethillE(text:string,key:string,n:string):Observable<any>{
    console.log("holiii")
    return this.http.get(`${this.baseURL}/hill/encrypt/${text}&${key}&${n}`)
  }
  gethillD(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/hill/decrypt/${text}&${key}`)
  }
  gethillA(text:string,plain_text:string,cipher_text:string):Observable<any>{
    return this.http.get(`${this.baseURL}/hill/analysis/${plain_text}&${cipher_text}`)
  }
}
