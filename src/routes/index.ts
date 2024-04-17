import { Router, Request, Response } from "express";
import userRouter from "./userRoutes";
import projectRouter from "./projectRoutes";
import positionRouter from "./positionRoutes";
import openingRouter from "./openingRoutes";
import clientRouter from "./clientRoutes";
import employeeRouter from "./employeeRoutes";
import entityRouter from "./entityRoutes";
import ticketLogRouter from "./ticketLogRoutes";
import roleRouter from "./roleRoutes";
import applicationRouter from "./applicationRoutes";
import peopleRouter from "./peopleRoutes";
import candidateRouter from "./candidateRoutes";

const apiRouter: Router = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/projects", projectRouter);
apiRouter.use("/positions", positionRouter);
apiRouter.use("/clients", clientRouter);
apiRouter.use("/openings", openingRouter);
apiRouter.use("/employee", employeeRouter);
apiRouter.use("/entities", entityRouter);
apiRouter.use("/ticketlogs", ticketLogRouter);
apiRouter.use("/role", roleRouter);
apiRouter.use("/applications", applicationRouter);
apiRouter.use("/people", peopleRouter);
apiRouter.use("/candidates", candidateRouter);
apiRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

export default apiRouter;
