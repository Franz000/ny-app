import { Router } from 'express';
import sesnorControlador from '../controladores/sesnorControlador';


class SensorRutas {
    public ruta: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.ruta.post('/esp32server/data', sesnorControlador.guardarData );
        this.ruta.post('/esp32server/add', sesnorControlador.agregarDisposirivo );
        this.ruta.post('/esp32server/obtener/paciente', sesnorControlador.obtenerPaciente );
        this.ruta.get('/:id', sesnorControlador.obtener );
        this.ruta.post('/', sesnorControlador.crear );
        this.ruta.delete('/:id', sesnorControlador.borrar );
        this.ruta.put('/:id', sesnorControlador.actualizar );
    }

}

const sensorRutas = new SensorRutas();

export default sensorRutas.ruta;