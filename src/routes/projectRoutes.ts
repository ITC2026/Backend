import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getJobPositionsByProject,
  createPositionByProject,
} from "../controller/projectController";

const projectRouter: Router = Router();

projectRouter.get("/", getProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.post("/", createProject);
projectRouter.delete("/", deleteProject);
projectRouter.patch("/:id", updateProject);
projectRouter.get("/:id/positions", getJobPositionsByProject);
projectRouter.post(":id/positions", createPositionByProject);
export default projectRouter;
