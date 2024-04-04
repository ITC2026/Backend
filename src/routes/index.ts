import { Router, Request, Response } from "express";
import userRoutes from "./userRoutes";
import projectRouter from "./projectRoutes";
import positionRouter from "./positionRoutes";
import openingRouter from "./openingRoutes";
import clientRouter from "./clientRoutes";
import employeeRoutes from "./employeeRoutes";
import roleRoutes from "./roleRoutes";

const apiRouter: Router = Router();

apiRouter.use("/user", userRoutes);
apiRouter.use("/projects", projectRouter);
apiRouter.use("/positions", positionRouter);
apiRouter.use("/clients", clientRouter);
apiRouter.use("/openings", openingRouter);
apiRouter.use("/employee", employeeRoutes);
apiRouter.use("/role", roleRoutes);
apiRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

export default apiRouter;
