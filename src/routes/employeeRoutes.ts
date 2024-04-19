import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controller/employeesController";

const employeeRouter = express.Router();

employeeRouter.get("/", getAllEmployees);
employeeRouter.get("/:id", getEmployeeById);
employeeRouter.post("/", createEmployee);
employeeRouter.patch("/:id", updateEmployee);
employeeRouter.delete("/", deleteEmployee);

export default employeeRouter;
