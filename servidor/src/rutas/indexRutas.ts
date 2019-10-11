import { Router } from 'express';
import { indexControlador } from '../controladores/indexControlador';

class IndexRutas {
    public ruta: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.ruta.get('/', indexControlador.index);
    }

}

const indexRutas = new IndexRutas();

export default indexRutas.ruta;