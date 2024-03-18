import { Router, Request, Response } from 'express';
import employeeRoutes from './employeeRoutes';

const apiRouter: Router = Router();

apiRouter.use('/employee', employeeRoutes);

apiRouter.get('/', (req:Request, res:Response) => {
    res.send('Hello World');
});

export default apiRouter;