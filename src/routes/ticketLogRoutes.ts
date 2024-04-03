import { Router } from "express";
import {
  createTicketLog,
  deleteTicketLog,
  getTicketLogs,
  getTicketLogById,
  modifyTicketLog,
} from "../controller/ticketLogController";

const userRouter = Router();

userRouter.get("/", getTicketLogs);
userRouter.get("/:id", getTicketLogById);
userRouter.post("/", createTicketLog);
userRouter.patch("/:id", modifyTicketLog);
userRouter.delete("/", deleteTicketLog);

export default userRouter;
