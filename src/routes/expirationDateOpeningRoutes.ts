import { Router } from "express";
import {
  createExpirationDateOpening,
  deleteExpirationDateOpening,
  getAllExpirationDateOpenings,
  getExpirationDateOpeningById,
  updateExpirationDateOpening,
} from "../controller/expirationDateOpeningController";

const expirationDateOpeningRouter = Router();

expirationDateOpeningRouter.get("/", getAllExpirationDateOpenings);
expirationDateOpeningRouter.get("/:id", getExpirationDateOpeningById);
expirationDateOpeningRouter.post("/", createExpirationDateOpening);
expirationDateOpeningRouter.patch("/:id", updateExpirationDateOpening);
expirationDateOpeningRouter.delete("/", deleteExpirationDateOpening);

export default expirationDateOpeningRouter;