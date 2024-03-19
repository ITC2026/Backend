import { Router, Request, Response } from "express";
import userRoutes from "./userRoutes";
import projectRouter from "./projectRoutes";
import positionRouter from "./positionRoutes";
import vacancyRouter from "./vacancyRoutes";

const apiRouter: Router = Router();

apiRouter.use("/user", userRoutes);
apiRouter.use("/projects", projectRouter);
apiRouter.use("/positions", positionRouter);
apiRouter.use("/vacancies", vacancyRouter)

apiRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript 4!");
});

export default apiRouter;
