import { RequestHandler, Request, Response } from "express";
import { Employee } from "../models/person/employees";
import { Person } from "../models/person/people";
import validator from "validator";

const JOBGRADE = ["C3", "C4", "C5", "C6"];
const PROPOSEDACTION = ["Project Search",
      "Using In Internal Project",
      "Upskilling Crosstraining",
      "Backup / Shadow other projects",
      "Resource Pool",
      "No action required",
      "Others",
      "Attrition"];
const EMPLOYEESTATUS = ["On Hired", "Layoff", "Resigned"];
const EMPLOYEEREASON = ["In Training",
      "Induction / Orientation",
      "Shadow Resources",
      "Awaiting Client Confirmation Joining",
      "Maternity Leave",
      "Sabbatical / Other Leave",
      "Previous Client Attrition",
      "Previous Client HC Reduction",
      "Transition Between Projects",
      "No Available Projects",
      "Internal Project",
      "Moved to Billing",
      "Performance Issues / PIP",
      "Other",
      "Intern"];

export const getAllEmployees: RequestHandler = async (
  req: Request,
  res: Response
) => {
  Employee.findAll({})
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

export const getEmployeeById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  Employee.findByPk(req.params.id)
    .then((data: Employee | null) => {
      if (data) {
        return res.status(200).json({
          status: "success",
          message: "Employee retrieved successfully",
          payload: data,
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "Employee not found",
          payload: null,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Something happened retrieving the product. " + err.message,
        payload: null,
      });
    });
};

export const createEmployee: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  const {
    salary,
    job_grade,
    proposed_action,
    employee_status,
    employee_reason,
    person_id
  } = req.body;

  // Default last movement to creation date
  var str = new Date().setSeconds(0,0);
  var dt = new Date(str).toISOString(); 
  req.body.last_movement_at = dt;

  //Validations
  if (
    !salary ||
    !job_grade ||
    !proposed_action ||
    !employee_status ||
    !person_id||
    !employee_reason
  ) {
    return res.status(400).json({
      status: "error",
      message: "Required information missing",
      payload: null,
    });
  }

  if (!JOBGRADE.includes(job_grade)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid job grade provided",
      payload: null,
    });
  }

  if (!PROPOSEDACTION.includes(proposed_action)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid proposed action provided",
      payload: null,
    });
  }

  if (!EMPLOYEESTATUS.includes(employee_status)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid status provided",
      payload: null,
    });
  }

  if (!EMPLOYEEREASON.includes(employee_reason)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid reason provided",
      payload: null,
    });
  }

  Person.findByPk(person_id)
  .then((person:Person | null) =>{
    if(person){
      Employee.create({ ...req.body })
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
          message: "Something happened creating an employee. " + error.message,
          payload: null,
        });
      });
    } else{
      return res.status(404).json({
        status: "error",
        message: "Person not found",
        payload: null,
      });
    }
  })
  .catch((error:Error) => {
    return res.status(500).json({
      status: "Error",
      message: "Something happened creating an employee. " + error.message,
      payload: null,
    });
  });
};

export const updateEmployee: RequestHandler = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  const {
    salary,
    job_grade,
    proposed_action,
    employee_status,
    employee_reason,
    person_id
  } = req.body;

  //Validations
  if (
    !salary ||
    !job_grade ||
    !proposed_action ||
    !employee_status ||
    !person_id||
    !employee_reason
  ) {
    return res.status(400).json({
      status: "error",
      message: "Required information missing",
      payload: null,
    });
  }

  if (!JOBGRADE.includes(job_grade)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid job grade provided",
      payload: null,
    });
  }

  if (!PROPOSEDACTION.includes(proposed_action)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid proposed action provided",
      payload: null,
    });
  }

  if (!EMPLOYEESTATUS.includes(employee_status)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid status provided",
      payload: null,
    });
  }

  if (!EMPLOYEEREASON.includes(employee_reason)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid reason provided",
      payload: null,
    });
  }

  Person.findByPk(person_id)
  .then(async (person:Person | null) =>{
    if(person){
      try {
        const employee = await Employee.findOne({ where: { id: req.params.id } });

        if (!employee) {
          return res.status(404).json({
            status: "Error",
            message: "Employee not found",
            payload: null,
          });
        } else{

          employee.update(req.body)
          .then(() =>{
            return res.status(200).json({
              status: "Success",
              message: "Employee updated successfully",
              payload: employee,
            });
          })
          .catch ((err:Error) => {
            return res.status(500).json({
              status: "Error",
              message: "Something happened updating the employee " + err,
              payload: null,
            });
          });
        }

      }
      catch (err) {
        return res.status(500).json({
          status: "Error",
          message: "Something happened updating the employee " + err,
          payload: null,
        });
      }
    } else {
      return res.status(404).json({
        status: "error",
        message: "Person not found",
        payload: null,
      });
    }
  })
  .catch((error:Error) => {
    return res.status(500).json({
      status: "Error",
      message: "Something happened updating an employee. " + error.message,
      payload: null,
    });
  });
};

export const deleteEmployee: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;

  Employee.findByPk(id)
  .then((data: Employee | null) => {
    if (data) {
      Employee.destroy({ where: { id } })
      .then((isDeleted) => {
        if(isDeleted){
          return res.status(200).json({ 
            status: "success",
            message: "Employeee deleted successfully",
            payload: null,
          });
        } else{
          return res.status(500).json({
            status: "error",
            message: "There was an error deleting the employee",
            payload: null,
          });
        }
      })
      .catch ((err:Error) => {
        return res.status(500).json({
          status: "error",
          message: "There was an error deleting the employee" + err,
          payload: null,
        });
      });
    } else{
      return res.status(404).json({
        status: "error",
        message: "Employee not found",
        payload: null,
      });
    }
  })
  .catch((err:Error) => {
    return res.status(500).json({
      status: "error",
      message: "There was an error deleting the employee hola" + err,
      payload: null,
    });
  });
};
