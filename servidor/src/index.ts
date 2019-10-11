import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRutas from './rutas/indexRutas';
import sensorRutas from './rutas/sensorRutas';
import cuentaRutas from './rutas/cuentaRutas';
import loginRutas from './rutas/LoginRutas';

class Server {
    public app: Application;
    constructor(puerto: Number) {
        this.app = express();
        this.config(puerto);
        this.rutas();
    }

    config(puerto: Number): void {
        this.app.set('port', process.env.PORT || puerto);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    rutas(): void {
        this.app.use('/',indexRutas);
        this.app.use('/api/sensor',sensorRutas);
        this.app.use('/api/cuenta',cuentaRutas);
        this.app.use('/api/users',loginRutas);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port'));
        });
    }
}

const server = new Server(3500);

server.start();
console.log("Server running...");