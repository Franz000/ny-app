import { Request, Response } from 'express';

class IndexControlador {

    public index (req: Request, res: Response ) {
        res.json({mesanje: 'API incorrect.'})
    }

    constructor() {
        
    }
}

export const indexControlador = new IndexControlador();