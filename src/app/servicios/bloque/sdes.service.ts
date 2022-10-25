import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SdesService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getsdesE(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/sdes/encrypt/${text}&${key}`)
  }
  getsdesD(text:string,key:string):Observable<any>{
    return this.http.get(`${this.baseURL}/sdes/decrypt/${text}&${key}`)
  }
}

