import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeCandidateById,
  getEmployeeBenchById,
  getEmployeeBillingById,
} from "../controller/employeesController";

const employeeRouter = express.Router();

employeeRouter.get("/", getAllEmployees);
employeeRouter.get("/:id", getEmployeeById);
employeeRouter.post("/", createEmployee);
employeeRouter.patch("/:id", updateEmployee);
employeeRouter.delete("/", deleteEmployee);
employeeRouter.get("/candidates/:id", getEmployeeCandidateById);
employeeRouter.get("/bench/:id", getEmployeeBenchById);
employeeRouter.get("/billing/:id", getEmployeeBillingById);

export default employeeRouter;
