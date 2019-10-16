import { Request, Response } from 'express';
import db from '../database'

class PacienteControlador {

    public async agregarPaciente(req: Request, res: Response) {
        const { nombre, apellidos, carnet, fechaNacimiento, sexo, idMedico } = req.body;
        console.log(req.body);
        if (Boolean(nombre) && Boolean(apellidos) && Boolean(carnet) && Boolean(fechaNacimiento) && Boolean(sexo) && Boolean(idMedico)) {
            const verMedico = await db.query('SELECT * FROM cuentas WHERE id = ?', [idMedico]);

            if (verMedico.length > 0) {




                const verPaciente = await db.query('SELECT * FROM persona WHERE carnet = ?', [carnet]);
                if (verPaciente.length == 0) {
                    const persona = {
                        nombre, apellidos, carnet
                    }
                    await db.query('INSERT INTO persona set ?', [persona]);
                    const nuevoPersona = await db.query('SELECT id FROM persona WHERE carnet = ?', [carnet]);
                    if (nuevoPersona.length > 0) {
                        const { id } = nuevoPersona[0];
                        const paciente = {
                            id, fechaNacimiento, sexo
                        }
                        const pame= {
                            idPaciente: id,
                            idMedico: idMedico
                        }
                        await db.query('INSERT INTO paciente set ? ', [paciente]);
                        await db.query('INSERT INTO pacientemedico set ?',[pame]);
                        res.json({ mesanje: "Paciente registrado" });
                    } else {
                        res.json({ error: "No se pudo registrar al paciente" })
                    }
                } else {
                    res.json({ error: "El paciente ya esta registrado, cambie el carnet" })
                }
            }else{
                res.json({ error: "Credenciales de Medico Incorrectos" })
            }
        } else {
            res.json({ error: "Faltan Datos." })
        }
    }

    public async borrarPaciente(req: Request, res: Response) {
        const { id } = req.params;
        await db.query('DELETE FROM paciente WHERE id = ?', [id]);
        await db.query('DELETE FROM persona WHERE id = ?', [id]);
        res.json({ mensaje: "Paciente Eliminado." });
    }

    public async actualizarPaciente(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, apellidos, carnet, fechaNacimiento, sexo } = req.body;
        const paciente = {
            fechaNacimiento,
            sexo
        }
        const persona = {
            nombre,
            apellidos,
            carnet
        }
        await db.query('UPDATE paciente set ? WHERE id= ?', [paciente, id]);
        await db.query('UPDATE persona set ? WHERE id= ?', [persona, id]);
        res.json({ mensaje: "Paciente Actualizado." });
    }

    public async listaPaciente(req: Request, res: Response) {
        const { id } = req.params;
        const medico = await db.query('SELECT id FROM cuentas WHERE id = ?',[id]);
        if(medico.length > 0){
            const pacientes = await db.query('SELECT * FROM pacientemedico WHERE idMedico = ?',[id]);
            
            let lista = [];
            for(let paciente of pacientes ){
                const { idPaciente } = paciente;
                const datosPac = await db.query('SELECT * FROM persona pe INNER JOIN paciente p ON p.id=pe.id WHERE p.id = ?',[idPaciente])
                lista.push(datosPac);
            }
            res.json(lista);
        }else{
            res.status(401).json({error: "Error de credenciales"});
        }
    }

    public async obtenerPaciente(req: Request, res: Response) {
        const { id } = req.params;
        const paciente = await db.query('SELECT * FROM persona pe INNER JOIN paciente p ON p.id=pe.id WHERE p.id = ?',[id]);
        if(paciente.length>0){
            res.json(paciente[0]);
        }else{
            res.status(404).json({error: "No se encontro el paciente"});
        }
    }

    public index(req: Request, res: Response) {
        res.json({ mesanje: 'API incorrect.' })
    }

    constructor() {

    }
}

export const pacienteControlador = new PacienteControlador();