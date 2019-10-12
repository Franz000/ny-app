import { Request, Response } from 'express';
import { encode, decode } from 'jwt-simple';
import db from '../database'

class CuentaControlador {

    public async listar(req: Request, res: Response): Promise<void> {
        const cuentas = await db.query('SELECT * FROM persona p INNER JOIN cuentas c ON c.id = p.id');
        console.log(cuentas);
        res.json(cuentas);
    }

    public async obtener(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const cuenta = await db.query('SELECT * FROM persona p INNER JOIN cuentas c ON c.id = p.id WHERE id = ?', [id]);
        console.log("ok?",cuenta);
        if (cuenta.length > 0) {
            res.json(cuenta[0]);
        } else {
            res.status(404).json({ mensaje: "La Cuenta No Existe!!" })
        }
    }


    public async crear(req: Request, res: Response): Promise<any> {
        const { usuario, password, apellidos, carnet, nombre } = req.body;
        if (Boolean(usuario) && Boolean(password)) {
            console.log(req.body);
            const existe = await db.query('SELECT * FROM cuentas WHERE usuario = ?', [usuario]);
            console.log("existe", existe);
            if (existe.length > 0) {
                res.status(404).json({ mensaje: "La Cuenta Ya Esta Registrada." });
            } else {
                const key = "Palabra Clave";
                const token = encode({ usuario: usuario }, key, 'HS256');
                const tipo = 0;
                const cuenta = { usuario, password, tipo, token};
                console.log("cuenta", cuenta);
                // var decoded = decode(token, key);
                await db.query('INSERT INTO cuentas set ?', [cuenta]);
                const data = await db.query('SELECT id FROM CUENTAS WHERE usuario = ?', [usuario]);
                if(data.length > 0){
                    const { id } = data[0];
                    const persona ={ id, nombre, apellidos, carnet};
                    await db.query('INSERT INTO persona set ?', [persona])
                    res.json({ mensaje: "Cuenta Registrada" });
                }else{
                    res.status(404).json({ mensaje: 'Se espera: "USUARIO" y "PASSWORD"' });
                }
            }
        } else {
            res.status(404).json({ mensaje: 'Se espera: "USUARIO" y "PASSWORD"' });
        }
    }

    public async borrar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM cuentas WHERE id = ?', [id]);
        res.json({ mensaje: "Cuenta Eliminada." });
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE cuentas set ? WHERE id= ?', [req.body, id]);
        res.json({ mensaje: "Cuenta Actualizada." });
    }
}

const cuentaControlador = new CuentaControlador();

export default cuentaControlador;