import { RequestHandler, Request, Response } from 'express';
import { Employee } from '../models/employee/employee';
import { Pipeline } from '../models/employee/pipeline';
import { Hired } from '../models/employee/hired_employee';
import { Bench } from '../models/employee/bench';
import { Billing } from '../models/employee/billing';

export const getAllEmployees: RequestHandler = async (req: Request, res: Response) => {
  Employee.findAll({ 
      include: { 
        all: true, nested: true 
      }
    })
    .then((data: Employee[]) => {
      return res.status(200).json({
        status: "success",
        message: "Employees successfully retrieved.",
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


export const getEmployeeById: RequestHandler = async (req: Request, res: Response) => {
  Employee.findByPk(req.params.id, { 
      include: { 
        all: true, nested: true 
      }
    })
    .then((data: Employee | null) => {
      return res.status(200).json({
        status: "success",
        message: "Employee successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Something happened retrieving the product. " + err.message,
        payload: null,
      });
    });
};

export const getEmployeePipelineById: RequestHandler = async (req: Request, res: Response) => {
  Employee.findByPk(req.params.id, { 
      include: [{
        model: Pipeline
      }]
    })
    .then((data: Employee | null) => {
      return res.status(200).json({
        status: "success",
        message: "Employee successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Something happened retrieving the product. " + err.message,
        payload: null,
      });
    });
};

export const getEmployeeBenchById: RequestHandler = async (req: Request, res: Response) => {
  Employee.findByPk(req.params.id, { 
      include: [{
        model: Hired,
        include: [{
          model: Bench,
        }]
      }]
    })
    .then((data: Employee | null) => {
      return res.status(200).json({
        status: "success",
        message: "Employee successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Something happened retrieving the product. " + err.message,
        payload: null,
      });
    });
};

export const getEmployeeBillingById: RequestHandler = async (req: Request, res: Response) => {
  Employee.findByPk(req.params.id, { 
      include: [{
        model: Hired,
        include: [{
          model: Billing,
        }]
      }]
    })
    .then((data: Employee | null) => {
      return res.status(200).json({
        status: "success",
        message: "Employee successfully retrieved",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Something happened retrieving the product. " + err.message,
        payload: null,
      });
    });
};

//TO DO

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