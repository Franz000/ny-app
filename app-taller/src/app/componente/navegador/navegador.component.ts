import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticarService } from 'src/app/Servicios/autenticar.service';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.scss']
})
export class NavegadorComponent implements OnInit {

  currentUser: Login;
  
  constructor(private router: Router, private autenticarService: AutenticarService) { 
    this.autenticarService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() {
    this.autenticarService.logout();
    this.router.navigate(['/login']);
}

}
