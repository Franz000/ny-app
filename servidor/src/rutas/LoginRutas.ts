import { Router } from 'express';
import loginControlador from '../controladores/loginControlador';


class LoginRutas {
    public ruta: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.ruta.post('/login', loginControlador.iniciar );
        this.ruta.options('/login?include=user', loginControlador.options );
        this.ruta.delete('/login/:id', loginControlador.desconectar );
    }

}

const loginRutas = new LoginRutas();

export default loginRutas.ruta;