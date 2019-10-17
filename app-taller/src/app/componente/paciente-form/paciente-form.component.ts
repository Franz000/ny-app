import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticarService } from 'src/app/Servicios/autenticar.service';
import { Location, formatDate } from '@angular/common';
import { Paciente } from 'src/app/models/Paciente';
import { PacienteService } from 'src/app/Servicios/paciente.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { isObservable } from 'rxjs';
import { AlertaService } from 'src/app/Servicios/alerta.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CuentasService } from 'src/app/Servicios/cuentas.service';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.scss']
})
export class PacienteFormComponent implements OnInit {

  formPaciente: FormGroup;

  submitted = {
    fechaNacimiento: false,
    apellidos: false,
    carnet: false,
    nombre: false,
    sexo: false,
    idMedico: false
  };

  editar: boolean;
  returnUrl:string;

  minDate = new Date(1900, 0, 1);
  maxDate = new Date();

  admin: boolean = false;


  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  paciente: Paciente = {
    fechaNacimiento: null,
    apellidos: '',
    carnet: '',
    nombre: '',
    sexo: null,
    idMedico: null,
  };

  cuentas: any = [];

  constructor(private router: Router, 
    private _location: Location, 
    private activatedRoute: ActivatedRoute, 
    private autenticarService: AutenticarService, 
    private pacienteService: PacienteService, 
    private alertService: AlertaService,
    private route: ActivatedRoute,
    private cuentasService: CuentasService) {
    const params = this.activatedRoute.snapshot.params;
    if (params.id && this.autenticarService.currentUserValue) {
      this.pacienteService.getPaciente((params.id))
        .subscribe(
          res => {
            // console.log(res);
            // this.cuenta = res;
            // this.passwordR = this.cuenta.password;
            console.log("editar si");
            this.editar = true;
          },
          err => {
            // console.log(err);
            this.router.navigate(['/']);
          }
        );
    } else {
      if (this.autenticarService.currentUserValue) {
        // this.router.navigate(['/']);
      }
    }

    if(this.autenticarService.currentUserValue.tipo >= 3){
      this.admin = true;
      this.getCuentas();
    }

    this.formPaciente = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellidos': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'carnet': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'fechaNacimiento': new FormControl('', [Validators.required]),
      'sexo': new FormControl('', [Validators.required,Validators.pattern('[0-3]')]),
      'idMedico': new FormControl('', [Validators.required])
      //correo patron
      //Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    });
    this.formPaciente.setValue(this.paciente);


  }


  getCuentas(){
    console.log("x");

    this.cuentasService.getCuentas().subscribe(
      res => {
        this.cuentas = res;
        console.log(this.cuentas)
        this.cuentas.splice(0, 1);
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
     this.formPaciente.controls['nombre'].valueChanges.subscribe(data => {
      console.log(data);
     });

    this.formPaciente.controls['nombre'].statusChanges.subscribe(data => {
      console.log(data);
      // if(data=="VALID"){
        this.submitted.nombre = true;
      // }
    });
    this.formPaciente.controls['apellidos'].statusChanges.subscribe(data => {
      this.submitted.apellidos = true;
    });
    this.formPaciente.controls['carnet'].statusChanges.subscribe(data => {
      this.submitted.carnet = true;
    });
    this.formPaciente.controls['fechaNacimiento'].statusChanges.subscribe(data => {
      this.submitted.fechaNacimiento = true;
    });
    this.formPaciente.controls['sexo'].statusChanges.subscribe(data => {
      this.submitted.sexo = true;
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  atras() {
    this._location.back();
  }

  actualizarPaciente() {

  }
  borrar_alerta:any;

  timerAlert = ()=>{
    this.borrar_alerta = setTimeout(() => {
        this.alertService.clear();
    }, 10000);
  }


  registrarPaciente() {
    let pacienteNuevo: Paciente = this.formPaciente.value
    if(this.autenticarService.currentUserValue.tipo != 3){
      pacienteNuevo.idMedico = this.autenticarService.currentUserValue.id;
    }
    // delete this.paciente.id;
    console.log("paciente nuevo",pacienteNuevo);
    if (this.formPaciente.invalid){
      console.log("error");
      pacienteNuevo=null;
    }
    this.submitted.apellidos=true;
    this.submitted.carnet=true;
    this.submitted.fechaNacimiento=true;
    this.submitted.nombre=true;
    this.submitted.sexo=true;
    this.submitted.idMedico=true;
    
    // pacienteNuevo.sexo = pacienteNuevo.sexo == "Masculino"? 1: (pacienteNuevo.sexo == "Femenino"? 0: 2);
    
    
    clearTimeout(this.borrar_alerta);
    this.timerAlert();
    
    this.pacienteService.savePaciente(pacienteNuevo)
      .pipe(first())
      .subscribe(
        data => {
          if (isObservable(data)) {
            data.subscribe(
              algo => { console.log("x", algo) },
              error => {
                console.log("consola", error);
                this.alertService.error(error.error);
                // this.loading = false;
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




    // this.pacienteService.savePaciente(this.paciente).subscribe(
    //   res => {
    //     // console.log(res);
    //     this.router.navigate(['/cuentas']);
    //   },
    //   err => {
    //     // console.log(err);
    //   }
    // );
  }

}
