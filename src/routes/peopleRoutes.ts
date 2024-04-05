import { Router } from "express";
import {
  createPerson,
  deletePerson,
  getAllPeople,
  getPersonById,
  modifyPerson,
} from "../controller/peopleController";

const peopleRouter: Router = Router();

peopleRouter.get("/", getAllPeople);
peopleRouter.get("/:id", getPersonById);
peopleRouter.post("/", createPerson);
peopleRouter.delete("/", deletePerson);
peopleRouter.patch("/:id", modifyPerson);

export default peopleRouter;
