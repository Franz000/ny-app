import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cuenta } from '../models/Cuentas'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  API_URI = `http://${window.location.hostname}:3500/api`;

  constructor(private http: HttpClient) { }

  getCuentas(): Observable<Cuenta>{
    return this.http.get(`${this.API_URI}/cuenta`);
  }

  getCuenta(id: string): Observable<Cuenta>{
    return this.http.get(`${this.API_URI}/cuenta/${id}`);
  }

  deleteCuenta(id: string): Observable<Cuenta>{
    return this.http.delete(`${this.API_URI}/cuenta/${id}`);
  }

  saveCuenta(cuenta: Cuenta ): Observable<Cuenta> {
    return this.http.post(`${this.API_URI}/cuenta`,cuenta);
  }

  updateCuenta(id:string|number, upCuenta): Observable<Cuenta> {
    return this.http.put(`${this.API_URI}/cuenta/${id}`,upCuenta);
  }
}
