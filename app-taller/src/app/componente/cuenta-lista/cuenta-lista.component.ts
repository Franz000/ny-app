import { Component, OnInit, HostBinding } from '@angular/core';

import { CuentasService } from '../../Servicios/cuentas.service';
import { Login } from 'src/app/models/login';
import { AutenticarService } from 'src/app/Servicios/autenticar.service';
import { Router } from '@angular/router';
// import { Cuenta } from '../../models/Cuentas'

@Component({
  selector: 'app-cuenta-lista',
  templateUrl: './cuenta-lista.component.html',
  styleUrls: ['./cuenta-lista.component.scss']
})
export class CuentaListaComponent implements OnInit {
  
  @HostBinding('class') classes = 'row mr-0 mt-4 p-5';

  currentUser: Login;
  
  cuentas: Object;
  constructor(private cuentasService: CuentasService, private autenticarService: AutenticarService,private router: Router) {
    if(this.autenticarService.currentUserValue.tipo === 3 && this.autenticarService.currentUserValue){
      this.autenticarService.currentUser.subscribe(x => this.currentUser = x);
    }else{
      this.router.navigate(['/']);
    }
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
