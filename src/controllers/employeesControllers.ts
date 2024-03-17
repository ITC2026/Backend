import { Request, Response } from 'express';
import { Employee } from '../models/employee/employee'; 
import { Bench } from '../models/employee/bench';
import { Billing } from '../models/employee/billing';
import { Pipeline } from '../models/employee/pipeline';
import { Hired } from '../models/employee/hired_employee';

export const getAllEmployees = async (req: Request, res: Response) => {
  const employees = await Employee.findAll();
  res.json(employees);
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

export const getEmployeeBench = async (req: Request, res: Response) => {
    const employee = await Employee.findByPk(req.params.id, { include: Bench });
    res.json(employee);
  };
  
  export const getEmployeeBilling = async (req: Request, res: Response) => {
    const employee = await Employee.findByPk(req.params.id, { include: Billing });
    res.json(employee);
  };
  
  export const getEmployeePipeline = async (req: Request, res: Response) => {
    const employee = await Employee.findByPk(req.params.id, { include: Pipeline });
    res.json(employee);
  };
  
  export const getEmployeeHired = async (req: Request, res: Response) => {
    const employee = await Employee.findByPk(req.params.id, { include: Hired });
    res.json(employee);
  };