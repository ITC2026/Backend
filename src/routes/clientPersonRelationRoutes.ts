import { Router } from "express";
import {
  getAllClientPersonRelations,
  getClientPersonRelationById,
} from "../controller/clientPersonRelationController";

const clientPersonRelationRouter = Router();

clientPersonRelationRouter.get("/", getAllClientPersonRelations);
clientPersonRelationRouter.get("/:client_id/:person_id", getClientPersonRelationById);

export default clientPersonRelationRouter;