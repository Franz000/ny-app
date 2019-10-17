import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/internal/Observable";
import { map, catchError } from "rxjs/operators";

import { Login } from '../models/login';
import { BehaviorSubject, throwError } from 'rxjs';
import { CuentasService } from './cuentas.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;

  API_URI = `http://${window.location.hostname}:3500/api`;


  constructor(private http: HttpClient, private cuentasService: CuentasService) {
    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('usuarioOn')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('usuarioOn');
    this.currentUserSubject.next(null);
  }

  loginuser(login: Login): Observable<any> {
    return this.http.post<any>(`${this.API_URI}/users/login`, login).pipe(map(user => {//?include=user
      if (user.error) {
        const mensaje = user.error.mensaje;
        return throwError({ error: mensaje });
      }
      localStorage.setItem('usuarioOn', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }



  public get currentUserValue(): Login {
    // console.log(this.currentUserSubject.value)
    
    return this.currentUserSubject.value;
  }

}
