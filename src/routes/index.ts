import { Router, Request, Response } from 'express';
import userRoutes from "./userRoutes";


const apiRouter:Router = Router();
apiRouter.use('/user', userRoutes); //Usuarios

apiRouter.get('/', (req: Request, res: Response) => {
    res.send('Hola!');
});

export default apiRouter;