import { Request, Response } from 'express';
import db from '../database'

class CuentaControlador {

    public async listar(req: Request, res: Response): Promise<void> {
        const cuentas = await db.query('SELECT * FROM cuentas');
        console.log(cuentas);
        res.json(cuentas);
    }

    public async obtener(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const cuenta = await db.query('SELECT * FROM cuentas WHERE id = ?', [id]);
        console.log(cuenta);
        if (cuenta.length > 0) {
            res.json(cuenta[0]);
        } else {
            res.status(404).json({ mensaje: "La Cuenta No Existe!!" })
        }
    }

    public async crear(req: Request, res: Response): Promise<any> {
        const { usuario, password } = req.body;
        if (Boolean(usuario) && Boolean(password)) {
            console.log(req.body);
            const existe = await db.query('SELECT * FROM cuentas WHERE usuario = ?', [usuario])
            if (existe.length > 0) {
                res.status(404).json({ mensaje: "La Cuenta Ya Esta Registrada." });
            } else {
                await db.query('INSERT INTO cuentas set ?', [req.body]);
                res.json({ mensaje: "Cuenta Registrada" });
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