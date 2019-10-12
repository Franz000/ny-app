import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { AutenticarService } from 'src/app/Servicios/autenticar.service';
import { CuentasService } from 'src/app/Servicios/cuentas.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  currentUser: Login;

  constructor(private autenticarService: AutenticarService, private cuentasService: CuentasService) { 
    this.currentUser = this.autenticarService.currentUserValue;
  }

  ngOnInit() {
  }

}
