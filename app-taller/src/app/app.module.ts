import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegadorComponent } from './componente/navegador/navegador.component';
import { CuentaFormComponent } from './componente/cuenta-form/cuenta-form.component';
import { CuentaListaComponent } from './componente/cuenta-lista/cuenta-lista.component';
import { LoginComponent } from './componente/login/login.component';

import { CuentasService } from './Servicios/cuentas.service'
import { AutenticarService } from './Servicios/autenticar.service'
import { PanelComponent } from './componente/panel/panel.component';
import { AlertaComponent } from './componente/alerta/alerta.component';
import { PacienteComponent } from './componente/paciente/paciente.component';
import { PacienteListaComponent } from './componente/paciente-lista/paciente-lista.component';
import { PacienteFormComponent } from './componente/paciente-form/paciente-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegadorComponent,
    CuentaFormComponent,
    CuentaListaComponent,
    LoginComponent,
    PanelComponent,
    AlertaComponent,
    PacienteComponent,
    PacienteListaComponent,
    PacienteFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CuentasService,
    AutenticarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
