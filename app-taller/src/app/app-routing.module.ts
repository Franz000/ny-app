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
    component: PanelComponent,
    canActivate: [AutenticarGuard]
    //redirectTo: '/index',
    //pathMatch: 'full'
  },{
    path: 'home',
    component: PanelComponent,
    canActivate: [AutenticarGuard]
    
  },{
    path: 'login',
    component: LoginComponent
  },{
    path: 'index',
    component: PanelComponent,
    canActivate: [AutenticarGuard]
  },{
    path: 'cuentas',
    component: CuentaListaComponent,
    canActivate: [AutenticarGuard]
  },{
    path: 'cuenta/registrar',
    component: CuentaFormComponent
  },{
    path: 'cuenta/edit/:id',
    component: CuentaFormComponent,
    canActivate: [AutenticarGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AutenticarGuard],
})
export class AppRoutingModule { }
