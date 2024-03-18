import { RequestHandler, Request, Response } from 'express';
import { Employee } from '../models/employee/employee';
import { Pipeline } from '../models/employee/pipeline';
import { Hired } from '../models/employee/hired_employee';
import { Bench } from '../models/employee/bench';
import { Billing } from '../models/employee/billing';

export const getAllEmployees: RequestHandler = async (req: Request, res: Response) => {
  Employee.findAll({include: [{
    model: Employee,
    attributes: ['name']
  }]})
  .then((data: Employee[]) => {
    return res.status(200).json({
      status: "success",
      message: "Employee successfully retrieved",
      payload: data,
    });
  })
  .catch((err) => {
    return res.status(500).json({
      status: "error",
      message: "Something happened retrieving all employees. " + err.message,
      payload: null,
    });
  });
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const employee = await Employee.findByPk(req.params.id);
  res.json(employee);
};

export const createEmployee = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  Employee.create({ ...req.body })
    .then((data: Employee) => {
      return res.status(201).json({
        status: "Success",
        message: "Employee created successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Employee not created",
        payload: error.message,
      });
    });
};

export const updateEmployee = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  const id = req.params.id;
  Employee.update({ ...req.body }, { where: { id } })
    .then((isUpdated) => {
      if (isUpdated) {
        return res.status(200).json({
          status: "Success",
          message: "Employee updated successfully",
          payload: { ...req.body },
        });
      }

      return res.status(500).json({
        status: "Success",
        message: "Something happened updating the employee",
        payload: null,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: `Employee not updated: ${error.message}`,
        payload: null,
      });
    });
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await Employee.destroy({ where: { id } });
    return res.status(200).json({ message: "Employee deleted" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting employee",
      error,
    });
  }
};
  
export const getEmployeePipelineById = async (req: Request, res: Response) => {
  const employee = await Employee.findByPk(req.params.id, { include: Pipeline });
  res.json(employee);
};

export const getEmployeeBenchById = async (req: Request, res: Response) => {
  const employee = await Employee.findByPk(req.params.id, { include: Bench });
  res.json(employee);
};

export const getEmployeeBillingById = async (req: Request, res: Response) => {
  const employee = await Employee.findByPk(req.params.id, { include: Billing });
  res.json(employee);
};