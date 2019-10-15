import { Router } from 'express';
import {pacienteControlador} from '../controladores/pacienteControlador';


class PacienteRutas {
    public ruta: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.ruta.post('/agregar', pacienteControlador.agregarPaciente );
        this.ruta.delete('/:id', pacienteControlador.borrarPaciente );
        this.ruta.put('/:id', pacienteControlador.actualizarPaciente );
        this.ruta.get('/medico/:id', pacienteControlador.listaPaciente );
        this.ruta.get('/:id', pacienteControlador.obtenerPaciente );
    }

}

const pacienteRutas = new PacienteRutas();

export default pacienteRutas.ruta;