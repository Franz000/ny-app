import { Router } from 'express';

class IndexRutas {
    public ruta: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.ruta.get('/',(req, res)=> {
            res.send('Hello World');
        });
    }

}

const indexRutas = new IndexRutas();

export default indexRutas.ruta;