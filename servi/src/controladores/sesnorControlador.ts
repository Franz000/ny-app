import { Request, Response } from 'express';
import db from '../database'

class SensorControlador {

    public listar(req: Request, res: Response) {
        db.query('DESCRIBE cuentas');
        res.json({ text: "Listando Sensores" });
    }

    public obtener(req: Request, res: Response) {
        db.query('DESCRIBE cuentas');
        res.json({ text: "Sensor " + req.params.id });
    }

    public crear(req: Request, res: Response) {
        res.json({ text: "Registro Sensor" });
    }

    public borrar(req: Request, res: Response) {
        res.json({ text: "Eliminado " + req.params.id });
    }

    public actualizar(req: Request, res: Response) {
        res.json({ text: "Actualizado el Sensor " + req.params.id });
    }
}

const sensorControlador = new SensorControlador();

export default sensorControlador;