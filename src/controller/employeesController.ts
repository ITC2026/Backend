import { RequestHandler, Request, Response } from 'express';
import { Employee } from '../models/person/employees';
import { Pipeline } from '../models/person/pipeline';
import { Bench } from '../models/person/bench';
import { Billing } from '../models/person/billing';

export const getAllEmployees: RequestHandler = async (req: Request, res: Response) => {
  Employee.findAll({ 
    include: [
      Pipeline, 
      {
        model: Hired,
        include: [Bench, Billing]
      }
    ]
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
    include: [
      Pipeline, 
      {
        model: Hired,
        include: [Bench, Billing]
      }
    ]
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

export const createEmployee: RequestHandler = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  Employee.create({ ...req.body }, {
      include: [
        Pipeline, 
        {
          model: Hired,
          include: [Bench, Billing]
        }
      ]
    })
    .then((data: Employee | null) => {
      return res.status(201).json({
        status: "Success",
        message: "Employee created successfully",
        payload: data,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "Error",
        message: "Something happened creating a product. " + error.message,
        payload: null,
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

  try {
    const employee = await Employee.findOne({ where: { id: req.params.id } });

    if (!employee) {
      return res.status(404).json({
        status: "Error",
        message: "Employee not found",
        payload: null,
      });
    }

    employee.update(req.body);

    if (req.body.pipeline) {
      const pipeline = await Pipeline.findOne({ where: { id: employee.pipelineId } });
      if (pipeline) {
        pipeline.update(req.body.pipeline);
      }
    }

    if (req.body.hired) {
      const hired = await Hired.findOne({ where: { id: employee.hiredId } });
      if (hired) {
        hired.update(req.body.hired);

        if (req.body.hired.bench) {
          const bench = await Bench.findOne({ where: { id: hired.benchId } });
          if (bench) {
            bench.update(req.body.hired.bench);
          }
        }

        if (req.body.hired.billing) {
          const billing = await Billing.findOne({ where: { id: hired.billingId } });
          if (billing) {
             billing.update(req.body.hired.billing);
          }
        }
      }
    }

    return res.status(200).json({
      status: "Success",
      message: "Employee updated successfully",
      payload: employee,
    }); 
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: "Something happened updating the employee " + err,
      payload: null,
    });
  }
};

export const deleteEmployee: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.body.id;
  try {
    await Employee.destroy({ where: { id } });
    return res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting employee. " + err,
    });
  }
};