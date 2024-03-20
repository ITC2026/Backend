import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getJobPositionsByProject,
  createPositionByProject,
  deletePositionByProject,
} from "../controller/projectController";

const projectRouter: Router = Router();

projectRouter.get("/", getProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.post("/", createProject);
projectRouter.delete("/", deleteProject);
projectRouter.patch("/:id", updateProject);

// Positions
projectRouter.get("/positions/:id", getJobPositionsByProject);
projectRouter.post("/positions/:id", createPositionByProject);
projectRouter.delete("/positions/:id", deletePositionByProject);

export default projectRouter;
