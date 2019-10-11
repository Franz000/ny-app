import { Router } from 'express';
import cuentaControlador from '../controladores/cuentaControlador';


class CuentaRutas {
    public ruta: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.ruta.get('/', cuentaControlador.listar );
        this.ruta.get('/:id', cuentaControlador.obtener );
        this.ruta.post('/', cuentaControlador.crear );
        this.ruta.delete('/:id', cuentaControlador.borrar );
        this.ruta.put('/:id', cuentaControlador.actualizar );
    }

}

const cuentaRutas = new CuentaRutas();

export default cuentaRutas.ruta;