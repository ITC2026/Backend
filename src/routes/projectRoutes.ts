import { Router, Request, Response } from "express";

const projectRouter: Router = Router();

projectRouter.get("/", (req: Request, res: Response) => {
  res.send("Get a list of projects");
});

projectRouter.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`Get a list of projects ${id}`);
});

projectRouter.post("/", (req: Request, res: Response) => {
  const id = req.body.id;
  const title = req.body.title;
  const price = req.body.price;
  res.send(`Create project ${id} - ${title} - ${price}`);
});

projectRouter.delete("/", (req: Request, res: Response) => {
  const id = req.body.id;
  res.send(`Deleted ${id}`);
});

export default projectRouter;
