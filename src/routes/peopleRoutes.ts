import { Router } from "express";
import {
  createPerson,
  deletePerson,
  getAllPeople,
  getPersonById,
  modifyPerson,
  getPositionByPerson,
  getProjectByPerson
} from "../controller/peopleController";

const peopleRouter: Router = Router();

peopleRouter.get("/", getAllPeople);
peopleRouter.get("/:id", getPersonById);
peopleRouter.post("/", createPerson);
peopleRouter.delete("/", deletePerson);
peopleRouter.patch("/:id", modifyPerson);

//Additional functions
peopleRouter.get("/position/:id", getPositionByPerson);
peopleRouter.get("/project/:id", getProjectByPerson)

export default peopleRouter;
