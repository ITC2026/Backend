import { Router, Request, Response } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controller/projectController";

const projectRouter: Router = Router();

projectRouter.get("/", getProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.post("/", createProject);
projectRouter.delete("/", deleteProject);
projectRouter.patch("/:id", updateProject);

export default projectRouter;
