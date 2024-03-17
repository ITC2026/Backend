import { Router, Request, Response } from 'express';
import userRoutes from "./userRoutes";


const apiRouter:Router = Router();
apiRouter.use('/user', userRoutes); //Usuarios

apiRouter.get('/', (req: Request, res: Response) => {
    res.send('Hola!');
});

export default apiRouter;


/*import productRoutes from './productRoutes';

const apiRouter: Router = Router();

apiRouter.use('/product', productRoutes);

apiRouter.get('/', (req:Request, res:Response) => {
    res.send('Hello TypeScript 4');
});

export default apiRouter;*/