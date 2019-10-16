import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Paciente } from '../models/Paciente';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PacienteService {
  API_URI:string = `http://${window.location.hostname}:3500/api`;

  constructor(private http: HttpClient) { }

  getPacientes(id:string|number): Observable<Paciente>{
    return this.http.get(`${this.API_URI}/paciente/medico${id}`);
  }

  getPaciente(id: string|number): Observable<Paciente>{
    return this.http.get(`${this.API_URI}/paciente/${id}`);
  }

  deletePaciente(id: string): Observable<Paciente>{
    return this.http.delete(`${this.API_URI}/paciente/${id}`);
  }

  savePaciente(cuenta: Paciente ): Observable<any> {
    return this.http.post<any>(`${this.API_URI}/paciente/agregar`,cuenta).pipe(map(paciente => {
      if (paciente.error) {
        const mensaje = paciente.error;
        return throwError({ error: mensaje });
      }
      return paciente.mensaje;
    }));
  }

  updatePaciente(id:string|number, upCuenta): Observable<Paciente> {
    return this.http.put(`${this.API_URI}/paciente/${id}`,upCuenta);
  }
}
