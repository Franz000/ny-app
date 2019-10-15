import { Router } from 'express';
import sesnorControlador from '../controladores/sesnorControlador';


class SensorRutas {
    public ruta: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.ruta.get('/', sesnorControlador.listar );
        this.ruta.get('/:id', sesnorControlador.obtener );
        this.ruta.post('/', sesnorControlador.crear );
        this.ruta.delete('/:id', sesnorControlador.borrar );
        this.ruta.put('/:id', sesnorControlador.actualizar );
    }

}

const sensorRutas = new SensorRutas();

export default sensorRutas.ruta;