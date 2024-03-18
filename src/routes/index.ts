import { Router, Request, Response } from "express";
import userRoutes from "./userRoutes";
import projectRouter from "./projectRoutes";
import positionRouter from "./positionRoutes";
import clientRouter from "./clientRoutes";

const apiRouter: Router = Router();

apiRouter.use("/user", userRoutes);
apiRouter.use("/projects", projectRouter);
apiRouter.use("/positions", positionRouter);
apiRouter.use("/clients", clientRouter);

apiRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript 4!");
});

export default apiRouter;
