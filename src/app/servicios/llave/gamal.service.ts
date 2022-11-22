import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamalService {
  private baseURL = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  getgamalE(msg:string,q:string,h:string,g:string):Observable<any>{
    console.log(`${msg}&${q}&${h}&${g}`)
    return this.http.get(`${this.baseURL}/gamal/encrypt/${msg}&${q}&${h}&${g}`)
  }
  getgamalD(msg:string,q:string,h:string,g:string):Observable<any>{
    return this.http.get(`${this.baseURL}/gamal/decrypt/${msg}&${q}&${h}&${g}`)
  }
  getgamalK():Observable<any>{
    return this.http.get(`${this.baseURL}/gamal/key`)
  }
}

