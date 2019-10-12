import { Component, OnInit, HostBinding } from '@angular/core';

import { CuentasService } from '../../Servicios/cuentas.service';
import { Login } from 'src/app/models/login';
import { AutenticarService } from 'src/app/Servicios/autenticar.service';
// import { Cuenta } from '../../models/Cuentas'

@Component({
  selector: 'app-cuenta-lista',
  templateUrl: './cuenta-lista.component.html',
  styleUrls: ['./cuenta-lista.component.scss']
})
export class CuentaListaComponent implements OnInit {
  
  @HostBinding('class') classes = 'row';

  currentUser: Login;
  
  cuentas: any = [];
  constructor(private cuentasService: CuentasService, private autenticarService: AutenticarService) {
    this.autenticarService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
    this.getCuentas();
  }

  getCuentas(){
    this.cuentasService.getCuentas().subscribe(
      res => {
        this.cuentas = res;
      },
      err => console.log(err)
    );
  }

  deleteCuenta(id:string){
    this.cuentasService.deleteCuenta(id).subscribe(
      res=>{
        console.log(res);
        this.getCuentas();
      },
      err=>{
        console.log(err);
      }
    );
  }


}
