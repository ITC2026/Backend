import { Router, Request, Response } from "express";
import projectRouter from "./projectRoutes";
import positionRouter from "./positionRoutes";

const apiRouter: Router = Router();

apiRouter.get("/projects", projectRouter);
apiRouter.get("/positions", positionRouter);
apiRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript 4!");
});

export default apiRouter;
