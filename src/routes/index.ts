import { Router, Request, Response } from "express";
import userRoutes from "./userRoutes";
import projectRouter from "./projectRoutes";
import positionRouter from "./positionRoutes";
import vacancyRouter from "./vacancyRoutes";
import clientRouter from "./clientRoutes";
import employeeRoutes from './employeeRoutes';

const apiRouter: Router = Router();

apiRouter.use("/user", userRoutes);
apiRouter.use("/projects", projectRouter);
apiRouter.use("/positions", positionRouter);
apiRouter.use("/clients", clientRouter);
apiRouter.use("/vacancies", vacancyRouter)
apiRouter.use('/employee', employeeRoutes);
apiRouter.get('/', (req:Request, res:Response) => {
    res.send('Hello World');
});

export default apiRouter;
