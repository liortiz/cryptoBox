import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Gamal2Service {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getgamal2E(msg:string,mode:string):Observable<any>{
    return this.http.get(`${this.baseURL}/gamal2/encrypt/${msg}&${mode}`)
  }
  getgamal2D(msg:string):Observable<any>{
    return this.http.get(`${this.baseURL}/gamal2/decrypt/${msg}`)
  }
  getgamal2K():Observable<any>{
    return this.http.get(`${this.baseURL}/gamal2/key`)
  }
}

