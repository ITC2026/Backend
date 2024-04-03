import { Router } from "express";
import {
  createEntity,
  deleteEntity,
  getEntities,
  getEntityById,
  modifyEntity,
} from "../controller/entityController";

const userRouter = Router();

userRouter.get("/", getEntities);
userRouter.get("/:id", getEntityById);
userRouter.post("/", createEntity);
userRouter.patch("/:id", modifyEntity);
userRouter.delete("/", deleteEntity);

export default userRouter;
