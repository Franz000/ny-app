import { Request, Response } from 'express';
import db from '../database'

class SensorControlador {


    public async guardarData(req: Request, res: Response) {
        const { token, ecg, spo2, temp, idPa } = req.body;
        console.log(req.body);
        if (Boolean(token) && Boolean(ecg) && Boolean(spo2) && Boolean(temp) && Boolean(idPa)) {
            const API_B = await db.query("SELECT * FROM dispositivo WHERE token= ?", [token]);
            console.log("algo", API_B)
            if (API_B.length>0) {
                const pacienteE = await db.query('SELECT * FROM paciente WHERE id = ?', [idPa]);
                if (pacienteE.length>0) {
                    const pulsocardiaco = {
                        idPaciente: idPa,
                        pulsoCardiaco: ecg
                    }
                    const saturaciono2 = {
                        idPaciente: idPa,
                        saO2: spo2
                    }
                    const temperatura = {
                        idPaciente: idPa,
                        temperatura: temp
                    }
                    await db.query('INSERT INTO pulsocardiaco set ?', [pulsocardiaco]);
                    await db.query('INSERT INTO saturaciono2 set ?', [saturaciono2]);
                    await db.query('INSERT INTO temperatura set ?', [temperatura]);

                    res.json({ mensaje: "Datos Guardados" });

                } else {
                    res.status(404).json({ error: "El paciente no esta registrado" });
                }
            } else {
                res.status(401).json({ error: "credenciales incorrectos" });
            }
        } else {
            res.status(404).json({ error: "error con la api" });
        }
    }

    public async agregarDisposirivo(req: Request, res: Response){
        const { token, nombre } = req.body;
        if(Boolean(token) && Boolean(nombre) ){
            const verNombre = await db.query('SELECT * FROM dispositivo WHERE token = ? AND nombre = ?',[token, nombre]);
            if(verNombre.length==0){
                const datos  = {
                    token,nombre
                }
                await db.query('INSERT INTO dispositivo set ?',[datos]);
                res.json({mensaje: "Dispositivo Agregado"})
            }else{
                res.status(404).json({error: "El dispositivo ya existe"});
            }
        }else{
            res.status(404).json({error: "Los datos son incorrectos"});
        }
    }

    public async obtenerPaciente(req: Request, res: Response){
        const { token } = req.body;
        if(Boolean(token)){
            const dispositivo = await db.query('SELECT * FROM dispositivo WHERE token = ?', [token]);
            if(dispositivo.length>0){
                const { id } = dispositivo[0];
                const idPaciente = await db.query('SELECT * FROM equipopaciente WHERE idDispositivo = ?',[id]);
                if(idPaciente.length>0){
                    console.log("enviando ",idPaciente[0].idPaciente);
                    res.json(idPaciente[0].idPaciente);
                }else{
                    res.status(404).json({error: "No existe el paciente"});
                }
            }else{
                res.status(401).json({error: "Credenciales incorrectos"});
            }
        }else{
            res.status(404).json({error: "Se espera el Token"});
        }
    }

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