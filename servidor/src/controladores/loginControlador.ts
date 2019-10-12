import { Request, Response } from 'express';
import db from '../database'

class LoginControlador {

    public async iniciar(req: Request, res: Response): Promise<any> {
        const { usuario , password } = req.body;
        if (Boolean(usuario) && Boolean(password)) {
            console.log(req.body);
            const existe = await db.query('SELECT usuario, password, token FROM cuentas WHERE usuario = ? AND password = ?', [usuario, password]);
            console.log(existe.length);
            if (existe.length > 0) {
                res.json(existe[0]);
            } else {
                res.json({error: { mensaje: "La Cuenta No esta Registrada." } });
                // res.json({mensaje: "La Cuenta No esta Registrada."});
                // res.status(401).json({ mensaje: "La Cuenta No esta Registrada." });
            }
        } else {
            res.json({error: { mensaje: "La Cuenta No esta Registrada." } });

            // res.status(401).json({ mensaje: 'Se espera: "USUARIO" y "PASSWORD"' });
            // res.json({mensaje: "La Cuenta No esta Registrada."});
        }
    }
    public options(req: Request, res: Response){
        res.status(404).json({mensaje: '?'});
    }
    public async desconectar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //await db.query('DELETE FROM cuentas WHERE id = ?', [id]);
        res.json({ mensaje: "Cuenta Eliminada." });
    }

}

const loginControlador = new LoginControlador();

export default loginControlador;