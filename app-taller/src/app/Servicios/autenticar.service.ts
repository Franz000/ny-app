import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  API_URI = 'http://localhost:3500/api';


  constructor(private http: HttpClient) { }

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
  }

  loginuser(login: Login): Observable<any> {
    return this.http.post(`${this.API_URI}/users/login?include=user`, login);
  }
  
}
