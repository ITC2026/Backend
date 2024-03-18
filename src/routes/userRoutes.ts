import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  modifyUser,
} from "../controller/userController";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserById);

userRouter.post("/", createUser);

userRouter.patch("/:id", modifyUser);

userRouter.delete("/", deleteUser);

export default userRouter;
