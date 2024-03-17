import { Router, Request, Response } from 'express';
import productRoutes from './productRoutes';

const apiRouter: Router = Router();

apiRouter.use('/product', productRoutes);
apiRouter.use('/empleado', empleadoRoutes);

apiRouter.get('/', (req:Request, res:Response) => {
    res.send('Hello TypeScript 4');
});

export default apiRouter;