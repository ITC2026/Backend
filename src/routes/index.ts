import { Router, Request, Response } from 'express';
import projectRouter from './projectRoutes';

const apiRouter: Router = Router();

apiRouter.get("/projects", projectRouter);
apiRouter.get('/', (req:Request, res:Response) => {
    res.send('Hello TypeScript 4');
});

export default apiRouter;