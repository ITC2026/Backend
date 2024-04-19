import { Router } from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  modifyRole,
} from "../controller/roleController";

const roleRouter = Router();

roleRouter.get("/", getAllRoles);
roleRouter.get("/:id", getRoleById);
roleRouter.post("/", createRole);
roleRouter.patch("/:id", modifyRole);
roleRouter.delete("/", deleteRole);

export default roleRouter;
