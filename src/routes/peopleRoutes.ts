import { Router } from "express";
import {
  createPerson,
  deletePerson,
  getAllPeople,
  getPersonById,
  modifyPerson,
  getPositionByPerson
} from "../controller/peopleController";

const peopleRouter: Router = Router();

peopleRouter.get("/", getAllPeople);
peopleRouter.get("/:id", getPersonById);
peopleRouter.post("/", createPerson);
peopleRouter.delete("/", deletePerson);
peopleRouter.patch("/:id", modifyPerson);

peopleRouter.get("/position/:id", getPositionByPerson);

export default peopleRouter;
