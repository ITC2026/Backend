import { Router } from "express";
import {
  createApplication,
  deleteApplication,
  getAllApplications,
  getApplicationById,
  modifyApplication,
} from "../controller/applicationController";

const applicationRouter: Router = Router();

applicationRouter.get("/", getAllApplications);
applicationRouter.get("/:id", getApplicationById);
applicationRouter.post("/", createApplication);
applicationRouter.delete("/", deleteApplication);
applicationRouter.patch("/:id", modifyApplication);

export default applicationRouter;