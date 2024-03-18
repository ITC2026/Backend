import { Router, Request, Response } from "express";
import projectRouter from "./projectRoutes";
import positionRouter from "./positionRoutes";

const apiRouter: Router = Router();

apiRouter.use("/projects", projectRouter);
apiRouter.use("/positions", positionRouter);
apiRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript 4!");
});

export default apiRouter;
