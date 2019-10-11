import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './componente/login/login.component'
import { CuentaListaComponent } from './componente/cuenta-lista/cuenta-lista.component'
import { CuentaFormComponent } from './componente/cuenta-form/cuenta-form.component'
import { PanelComponent } from './componente/panel/panel.component'

import { AutenticarGuard } from './seguridad/autenticar.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
    //redirectTo: '/index',
    //pathMatch: 'full'
  },{
    path: 'dashboard',
    component: PanelComponent,
    canActivate: [AutenticarGuard]
  },{
    path: 'login',
    component: LoginComponent
  },{
    path: 'index',
    component: LoginComponent
  },{
    path: 'cuentas',
    component: CuentaListaComponent
  },{
    path: 'cuenta/registrar',
    component: CuentaFormComponent
  },{
    path: 'cuenta/edit/:id',
    component: CuentaFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AutenticarGuard],
})
export class AppRoutingModule { }
