import { Router } from "express";
import {
  createExpirationDateProject,
  deleteExpirationDateProject,
  getAllExpirationDateProjects,
  getExpirationDateProjectById,
  updateExpirationDateProject,
} from "../controller/expirationDateProjectController";

const expirationDateProjectRouter = Router();

expirationDateProjectRouter.get("/", getAllExpirationDateProjects);
expirationDateProjectRouter.get("/:id", getExpirationDateProjectById);
expirationDateProjectRouter.post("/", createExpirationDateProject);
expirationDateProjectRouter.patch("/:id", updateExpirationDateProject);
expirationDateProjectRouter.delete("/", deleteExpirationDateProject);

export default expirationDateProjectRouter;