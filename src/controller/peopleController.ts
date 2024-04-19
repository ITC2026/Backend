import { RequestHandler, Request, Response } from "express";
import { Person } from "../models/person/people";
import { Candidate } from "../models/person/candidates";
import { Employee } from "../models/person/employees";
import { Entity } from "../models/ticketLog/entities";

const TECH_STACK = [
  "Java",
  "React",
  "Python",
  "Automation",
  "Golang",
  "Javascript",
  ".NET",
  "Angular",
  "Appian",
  "PowerApps",
  "Manual Tester",
  "Kotlin",
  "UX",
  "iOS",
];
const DIVISION = ["MEXICO", "BRAZIL", "CSA", "USA"];
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
const GENDER = ["Male", "Female", "Nonbinary", "Did Not Want to Say"];

export const getAllPeople: RequestHandler = async (
  req: Request,
  res: Response
) => {
  Person.findAll({
    include: [
      {
        model: Candidate,
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
  if (!req.params.id) {
    return res.status(400).json({
      status: "error",
      message: "Please provide an ID to retrieve a Person.",
      payload: null,
    });
  }
  Person.findByPk(req.params.id, {
    include: [
      {
        model: Candidate,
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
      message: "Please provide data to create a Person.",
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
    gender,
    expected_salary,
  } = req.body;

  // Default status to Pipeline
  req.body.status = "Pipeline";

  if (
    !first_name ||
    !last_name ||
    !phone ||
    !email ||
    !title ||
    !tech_stack ||
    !division ||
    !region ||
    !gender ||
    !expected_salary
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

  if (!GENDER.includes(gender)) {
    return res.status(400).json({
      status: "error",
      message: `Invalid gender. ${gender} is not a valid option.`,
      payload: null,
    });
  }

  if (isNaN(expected_salary)) {
    return res.status(400).json({
      status: "error",
      message: `Invalid salary. ${expected_salary} is not a valid salary.`,
      payload: null,
    });
  }

  Person.create(req.body)
  .then(async (data: Person) => {
    const entityData = await Entity.create({
      type: "Person",
      isDeleted: false,
      belongs_to_id: data.id,
    });
    entityData.person_id = data.id;
    await entityData.save();
    return data;
  })
    .then((data: Person) => {
      Candidate.create({
        expected_salary,
        person_id: data.id,
      });
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
  if (!req.params.id) {
    return res.status(400).json({
      status: "error",
      message: "Please provide an ID of a Person to update.",
      payload: null,
    });
  }

  const {status, movement_reason} = req.body;

  Person.findByPk(req.params.id)
  .then((data: Person | null) => {
    if (data) {

      //If there was a status change
      if(status !== data.status){

        //If an associated employee already exists
        Employee.findOne({where: {person_id: data.id}})
        .then((emp: Employee | null) => {
          if(emp){
            var dt = new Date()
            dt.setSeconds(0,0); 
            emp.update({last_movement_at: dt})   //Change last movement date
          }
        })
        .catch((err:Error) => {
          return res.status(500).json({
            status: "error",
            message: "Something happened modifying the person. " + err.message,
            payload: null,
          });
        })
        
        //Make sure a reason is provided
        if(!movement_reason){
          return res.status(400).json({
            status: "error",
            message: "Movement reason was not provided",
            payload: null,
          });
        }
      }

      Person.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
          if (isUpdated) {
            return res.status(200).json({
              status: "success",
              message: "Person successfully updated.",
              payload: data,
            });
          } else{
            return res.status(500).json({
              status: "error",
              message: "There was an error updating the Person.",
              payload: null,
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({
            status: "error",
            message: "Something happened updating the person. " + err.message,
            payload: null,
          });
        });
    } else{
      return res.status(404).json({
        status: "error",
        message: "Person not found.",
        payload: null,
      });
    }
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
  Person.findByPk(req.body.id)
  .then((data: Person | null) => {
    if (data) {
      Person.destroy({ where: { id: req.body.id } })
        .then((isDeleted) => {
          if (isDeleted) {

            Entity.findOne( {
              where: {
                  belongs_to_id: req.body.id,
                  type: "Person"
              }} )
              .then((entity: Entity | null) =>{
                  if(entity){
                      entity.update({isDeleted: true})
                  }
              })

            return res.status(200).json({
              status: "success",
              message: "Person deleted successfully.",
              payload: null,
            });
          } else{
            return res.status(500).json({
              status: "error",
              message: "There was an error deleting the Person.",
              payload: null,
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({
            status: "error",
            message: "Something happened deleting the person. " + err.message,
            payload: null,
          });
        });
    } else{
      return res.status(404).json({
        status: "error",
        message: "Person not found.",
        payload: null,
      });
    }
  })
  .catch((error: Error) => {
    return res.status(500).json({
      status: "Error",
      message: "Error deleting Person",
      payload: error.message,
    });
  });
};
