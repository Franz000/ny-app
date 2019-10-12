import { Component, OnInit } from '@angular/core';

import { AutenticarService } from '../../Servicios/autenticar.service';
import { Login } from '../../models/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertaService } from 'src/app/Servicios/alerta.service';
import { isObservable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;

  loading = false;

  ngForm: FormGroup;
  returnUrl: string;

  private usuarioC: Login = {
    id: '',
    usuario: '',
    password: '',
    token: '',
    tipo:''
  }

  constructor(private fb: FormBuilder, private autenticarService: AutenticarService, private router: Router, private route: ActivatedRoute, private alertService: AlertaService) {
    if (this.autenticarService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }



  ngOnInit() {
    this.ngForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.ngForm.controls; }

  onLogin() {
    this.submitted = true;

    this.alertService.clear();
    this.loading = true;
    this.usuarioC.usuario = this.f.usuario.value;
    this.usuarioC.password = this.f.password.value;
    this.autenticarService.loginuser(this.usuarioC)
      .pipe(first())
      .subscribe(
        data => {
          if (isObservable(data)) {
            data.subscribe(
              algo => { console.log("x", algo) },
              error => {
                // console.log("consola", error.error);
                this.alertService.error(error.error);
                this.loading = false;
                // console.log("makl", error)
              });

          } else {
            // console.log("algo", data);
            this.router.navigate([this.returnUrl]);
          }
        },
        error => {
          console.log(error)
        });
  }




}
