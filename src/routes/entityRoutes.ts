import { Router } from "express";
import {
  createEntity,
  deleteEntity,
  getEntities,
  getEntityById,
  modifyEntity,
} from "../controller/entityController";

const entityRouter = Router();

entityRouter.get("/", getEntities);
entityRouter.get("/:id", getEntityById);
entityRouter.post("/", createEntity);
entityRouter.patch("/:id", modifyEntity);
entityRouter.delete("/", deleteEntity);

export default entityRouter;
