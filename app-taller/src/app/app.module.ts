import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegadorComponent } from './componenete/navegador/navegador.component';
import { CuentaFormComponent } from './componenete/cuenta-form/cuenta-form.component';
import { CuentaListaComponent } from './componenete/cuenta-lista/cuenta-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegadorComponent,
    CuentaFormComponent,
    CuentaListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
