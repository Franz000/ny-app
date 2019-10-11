import { Component, OnInit } from '@angular/core';

import { AutenticarService } from '../../Servicios/autenticar.service';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private usuario: Login = {
    usuario: '',
    password: ''
  }

  constructor(private autenticarService: AutenticarService) { }


  ngOnInit() {

  }

  onLogin() {
    return this.autenticarService.loginuser(this.usuario)
      .subscribe(
        res => {
          console.log(res);
          sessionStorage.setItem('usuario',res.token);

        },
        err => {
          console.log(err);
        }
      )
  }



}
