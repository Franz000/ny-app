import { Component, OnInit, HostBinding } from '@angular/core';
import { Cuenta } from '../../models/Cuentas';
import { ActivatedRoute, Router } from '@angular/router';

import { CuentasService } from '../../Servicios/cuentas.service';
import { AutenticarService } from 'src/app/Servicios/autenticar.service';
import { AlertaService } from 'src/app/Servicios/alerta.service';

@Component({
  selector: 'app-cuenta-form',
  templateUrl: './cuenta-form.component.html',
  styleUrls: ['./cuenta-form.component.scss']
})
export class CuentaFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  editar: boolean = false;
  cuenta: Cuenta = {
    id: 0,
    usuario: '',
    password: '',
    fecha: new Date(),
    apellidos: '',
    carnet: '',
    nombre: '',
  };

  passwordR: string = '';

  constructor(private cuentasService: CuentasService, private router: Router, private activatedRoute: ActivatedRoute, private autenticarService: AutenticarService, private alertService: AlertaService) {
  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    // console.log((Object.keys(params).length? "hay algo":"vacio"),params)
    if (((params.id && this.autenticarService.currentUserValue.tipo === 3) || params.current==="current") && this.autenticarService.currentUserValue) {
      this.cuentasService.getCuenta((params.id || this.autenticarService.currentUserValue.id))
        .subscribe(
          res => {
            // console.log(res);
            this.cuenta = res;
            this.passwordR = this.cuenta.password;
            this.editar = true;
          },
          err => {
            // console.log(err);
            this.router.navigate(['/']);
          }
        );
    } else {
      if((Object.keys(params).length && this.autenticarService.currentUserValue.tipo === 3 )){
        this.router.navigate(['/']);
      }
      else if (this.autenticarService.currentUserValue &&this.autenticarService.currentUserValue.tipo !== 3 ) {
        this.router.navigate(['/']);
      }

    }
  }

  registrarCuenta() {
    delete this.cuenta.fecha;
    delete this.cuenta.id;
    if (this.passwordR == this.cuenta.password) {
      // console.log(this.cuenta);
      this.cuentasService.saveCuenta(this.cuenta).subscribe(
        res => {
          // console.log(res);
          this.router.navigate(['/cuentas']);
        },
        err => {
          // console.log(err);
        }
      );
    } else {
      this.alertService.error("Datos Incorrectos");
    }
  }

  actualizarCuenta() {
    delete this.cuenta.fecha;
    if (this.passwordR == this.cuenta.password) {
      this.cuentasService.updateCuenta(this.cuenta.id, this.cuenta).subscribe(
        res => {
          // console.log(res);
          this.router.navigate(['/index']);
        },
        err => {
          // console.log(err);
        }
      );
    }
  }

}
