import { Component, OnInit, HostBinding } from '@angular/core';
import { Cuenta } from '../../models/Cuentas';
import { ActivatedRoute, Router } from '@angular/router';

import { CuentasService } from '../../Servicios/cuentas.service';
import { AutenticarService } from 'src/app/Servicios/autenticar.service';

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
    fecha: new Date()
  };

  passwordR: string = '';

  constructor(private cuentasService: CuentasService, private router: Router, private activatedRoute: ActivatedRoute, private autenticarService: AutenticarService) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;

    
    if (params.id) {
      this.cuentasService.getCuenta(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.cuenta = res;
            this.passwordR = this.cuenta.password;
            this.editar = true;
          },
          err => {
            console.log(err);
            this.router.navigate(['/']);
          }
        );
    }else{
      if (this.autenticarService.currentUserValue) {
        this.router.navigate(['/']);
      }
    }
  }

  registrarCuenta() {
    delete this.cuenta.fecha;
    delete this.cuenta.id;
    if (this.passwordR == this.cuenta.password) {
      this.cuentasService.saveCuenta(this.cuenta).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/index']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  actualizarCuenta(){
    delete this.cuenta.fecha;
    if (this.passwordR == this.cuenta.password) {
      this.cuentasService.updateCuenta(this.cuenta.id, this.cuenta).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/index']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
