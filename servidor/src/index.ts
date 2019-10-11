import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRutas from './rutas/indexRutas';
import sensorRutas from './rutas/sensorRutas';

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
        
    }

    rutas(): void {
        this.app.use('/',indexRutas);
        this.app.use('/api/sensor',sensorRutas);
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