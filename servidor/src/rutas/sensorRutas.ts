import { Router } from 'express';

class SensorRutas {
    public ruta: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.ruta.get('/',(req, res)=> {
            res.send('Sensor');
        });
    }

}

const sensorRutas = new SensorRutas();

export default sensorRutas.ruta;