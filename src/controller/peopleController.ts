import { RequestHandler, Request, Response } from "express";
import { Person } from "../models/person/people";
import { Pipeline } from "../models/person/pipeline";
import { Employee } from "../models/person/employees";

const TECH_STACK = [
  "Java",
  "React",
  "Python",
  "Automation",
  "Golang",
  "Javascript",
  "NET",
  "Angular",
  "Appian",
  "PowerApps",
  "ManualTester",
  "Kotlin",
  "UX",
  "iOS",
];
const DIVISION = ["MEXICO", "BRAZIL", "CSA", "US"];
const REGION = [
  "CDMX",
  "CUU",
  "HMO",
  "MID",
  "SLP",
  "CAMPINA",
  "SAO PAULO",
  "COLOMBIA",
  "PERU",
  "COSTA RICA",
  "ARGENTINA",
  "DOMINICANA",
  "DALLAS",
  "PHOENIX",
];

const STATUS = ["Pipeline", "Bench", "Billing"];

const GENDER = ["Male", "Female", "Nonbinary", "Did Not Want to Say"];

export const getAllPeople: RequestHandler = async (
  req: Request,
  res: Response
) => {
  Person.findAll({
    include: [
      {
        model: Pipeline,
      },
      {
        model: Employee,
      },
    ],
  })
    .then((data: Person[]) => {
      return res.status(200).json({
        status: "success",
        message: "People successfully retrieved.",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Something happened retrieving all people. " + err.message,
        payload: null,
      });
    });
};

export const getPersonById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Please provide an ID to retrieve a Person.",
      payload: null,
    });
  }
  Person.findByPk(req.params.id, {
    include: [
      {
        model: Pipeline,
      },
      {
        model: Employee,
      },
    ],
  })
    .then((data: Person | null) => {
      return res.status(200).json({
        status: "success",
        message: "Person successfully retrieved",
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

export const createPerson: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a person to create.",
      payload: null,
    });
  }
  const {
    first_name,
    last_name,
    phone,
    email,
    title,
    tech_stack,
    division,
    region,
    status,
    gender,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !phone ||
    !email ||
    !title ||
    !tech_stack ||
    !division ||
    !region ||
    !status ||
    !gender
  ) {
    return res.status(400).json({
      status: "error",
      message: "Please provide all required fields.",
      payload: null,
    });
  }

  if (!DIVISION.includes(division)) {
    return res.status(400).json({
      status: "error",
      message: `Invalid division. ${division} is not a valid division.`,
      payload: null,
    });
  }

  if (!REGION.includes(region)) {
    return res.status(400).json({
      status: "error",
      message: `Invalid region. ${region} is not a valid region.`,
      payload: null,
    });
  }

  if (!TECH_STACK.includes(tech_stack)) {
    return res.status(400).json({
      status: "error",
      message: `Invalid tech stack. ${tech_stack} is not a valid tech stack.`,
      payload: null,
    });
  }

  if (!STATUS.includes(status)) {
    return res.status(400).json({
      status: "error",
      message: `Invalid status. ${status} is not a valid status.`,
      payload: null,
    });
  }

  if (!GENDER.includes(gender)) {
    return res.status(400).json({
      status: "error",
      message: `Invalid gender. ${gender} is not a valid option.`,
      payload: null,
    });
  }

  Person.create(req.body)
    .then((data: Person) => {
      return res.status(201).json({
        status: "success",
        message: "Person successfully created.",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Something happened creating the person. " + err.message,
        payload: null,
      });
    });
};

export const modifyPerson: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a person to update.",
      payload: null,
    });
  }

  Person.findByPk(req.params.id).then((data: Person | null) => {
    if (data) {
      Person.update({ ...req.body }, { where: { id: req.params.id } })
        .then((data) => {
          if (data) {
            return res.status(200).json({
              status: "success",
              message: "Person successfully updated.",
              payload: data,
            });
          }
          return res.status(500).json({
            status: "error",
            message: "There was an error updating the Person.",
            payload: null,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: "error",
            message: "Something happened updating the person. " + err.message,
            payload: null,
          });
        });
    }
    return res.status(404).json({
      status: "error",
      message: "Person not found.",
      payload: null,
    });
  });
};

export const deletePerson: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Please provide an ID to delete a Person.",
      payload: null,
    });
  }
  Person.findByPk(req.params.id).then((data: Person | null) => {
    if (data) {
      Person.destroy({ where: { id: req.params.id } })
        .then((isDeleted) => {
          if (isDeleted) {
            return res.status(200).json({
              status: "success",
              message: "Person deleted successfully.",
              payload: null,
            });
          }
          return res.status(500).json({
            status: "error",
            message: "There was an error deleting the Person.",
            payload: null,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: "error",
            message: "Something happened deleting the person. " + err.message,
            payload: null,
          });
        });
    }
    return res.status(404).json({
      status: "error",
      message: "Person not found.",
      payload: null,
    });
  });
};
