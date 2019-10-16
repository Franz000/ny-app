export interface Paciente{
    id?: number;
    nombre?: string;
    apellidos?: string;
    carnet?: string;
    fechaNacimiento?: Date;
    sexo?:number|string;
    idMedico?: string|number;
}