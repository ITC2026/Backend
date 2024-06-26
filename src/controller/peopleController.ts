import { RequestHandler, Request, Response } from "express";
import { Person } from "../models/person/people";
import { Candidate } from "../models/person/candidates";
import { Employee } from "../models/person/employees";
import { Entity } from "../models/ticketLog/entities";
import { Opening } from "../models/position/openings";
import { Position } from "../models/position/positions";
import { Project } from "../models/project/projects";
import { Client } from "../models/client/clients";
import { createEmployee } from "./employeesController";

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
const STATUS = ["Pipeline", "Bench", "Billing"];
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

//Employee
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
      {
        model: Client,
        attributes: ["id", "client_name"],
        through: { attributes: [] }, // Exclude the join table attributes from the result
      }
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
      {
        model: Client,
        through: { attributes: [] }, // Exclude the join table attributes from the result
      }
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
        message: "Something happened retrieving the person. " + err.message,
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
    name,
    phone,
    email,
    title,
    tech_stack,
    division,
    region,
    gender,
    expected_salary,
    status
  } = req.body;


  if (
    !name ||
    !phone ||
    !email ||
    !title ||
    !tech_stack ||
    !division ||
    !region ||
    !gender ||
    !expected_salary ||
    !status
  ) {
    return res.status(400).json({
      status: "error",
      message: "Please provide all required fields.",
      payload: null,
    });
  }

  if (!STATUS.includes(status)) {
    return res.status(400).json({
      status: "error",
      message: `Invalid status. ${status} is not a valid option.`,
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

  // Check employee info is valid to prevent creation of person if something is wrong
  if(status === "Bench" || status === "Billing"){ 
    const {
      salary,
      job_grade,
      proposed_action,
      employee_status,
      employee_reason,
    } = req.body;

    //Validations
    if (
      !salary ||
      !job_grade ||
      !proposed_action ||
      !employee_status ||
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
      Candidate.create({  // create a candidate
        expected_salary,
        person_id: data.id,
        created_at: new Date,
        updated_at: new Date
      })

      .then(() => {
        if(status === "Bench" || status === "Billing"){   // When creating a person directly in Bench or Billing, create an employee
          req.body.person_id = data.id;
          createEmployee(req,res, () => {});

        } else{
          return res.status(201).json({
            status: "success",
            message: "Person successfully created.",
            payload: data,
          });
        }
      })
      
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

      const status_change = status !== data.status;
      const movement_from_pipeline = data.status === "Pipeline" && status !== "Pipeline";

      //If there was a status change
      if(status_change){

        //Trying to change from bench or billing to pipeline
        if(data.status !== "Pipeline" && status === "Pipeline"){
          return res.status(500).json({
            status: "error",
            message: "A movement to pipeline from bench or billing can not be done.",
            payload: null
          });
        }

        //Changing from pipeline to bench or billing make data validations
        if(movement_from_pipeline){
          const {
            salary,
            job_grade,
            proposed_action,
            employee_status,
            employee_reason,
          } = req.body;
      
          //Validations
          if (
            !salary ||
            !job_grade ||
            !proposed_action ||
            !employee_status ||
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

        }

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
            
            //Create employee if moved from pipeline to bench or billing
            if(movement_from_pipeline){
              req.body.person_id = data.id;
              createEmployee(req,res, () => {});
            } else{
              return res.status(200).json({
                status: "success",
                message: "Person successfully updated.",
                payload: data,
              });
            }
            
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

//Additional functions
export const getPositionByPerson: RequestHandler = (req:Request, res:Response) => {
  const id_person = req.params.id;

  Person.findByPk(id_person)
  .then((person:Person | null) => {
    if(person){

      Opening.findOne({ where: {person_id: id_person}})
      .then((opening:Opening |null) => {
        if(opening){

          Position.findOne({where: {id:opening.position_id}})
          .then((position:Position | null) =>{
            if(position){
              return res.status(200).json({
                status: "Success",
                message: "Position retrieved successfully",
                payload: position,
              });
            }
            else{
              return res.status(404).json({
                status: "Error",
                message: "Position not found",
                payload: null,
              });
            }
          })
          .catch((err: Error) => {
            return res.status(500).json({
              status: "error",
              message: "Something happened finding the position. " + err.message,
              payload: null,
            });
          });

        } else{
          return res.status(404).json({
            status: "Error",
            message: "An opening filled by this person was not found",
            payload: null,
          });
        }
      })
      .catch((err:Error) => {
        return res.status(500).json({
          status: "error",
          message: "Something happened finding the opening. " + err.message,
          payload: null,
        });
      });

    } else{
      return res.status(404).json({
        status: "Error",
        message: "Person not found",
        payload: null,
      });
    }
  })
  .catch((err:Error) => {
    return res.status(500).json({
      status: "error",
      message: "Something happened finding the person. " + err.message,
      payload: null,
    });
  })
}

export const getProjectByPerson: RequestHandler = (req: Request, res:Response) => {
  const id_person = req.params.id;

  Person.findByPk(id_person)
  .then((person:Person | null) => {
    if(person){

      Opening.findOne({ where: {person_id: id_person}})
      .then((opening:Opening |null) => {
        if(opening){

          Position.findOne({where: {id:opening.position_id}})
          .then((position:Position | null) =>{
            if(position){
              
              Project.findOne({where: {id: position.project_id}})
              .then((project: Project | null) => {
                if(project){
                  return res.status(200).json({
                    status: "Success",
                    message: "Project retrieved successfully",
                    payload: project,
                  });
                } else{
                  return res.status(404).json({
                    status: "Error",
                    message: "Project not found",
                    payload: null,
                  });
                }
              })
              .catch((err: Error) => {
                return res.status(500).json({
                  status: "error",
                  message: "Something happened finding the project. " + err.message,
                  payload: null,
                });
              });

            }
            else{
              return res.status(404).json({
                status: "Error",
                message: "Position not found",
                payload: null,
              });
            }
          })
          .catch((err: Error) => {
            return res.status(500).json({
              status: "error",
              message: "Something happened finding the position. " + err.message,
              payload: null,
            });
          });

        } else{
          return res.status(404).json({
            status: "Error",
            message: "An opening filled by this person was not found",
            payload: null,
          });
        }
      })
      .catch((err:Error) => {
        return res.status(500).json({
          status: "error",
          message: "Something happened finding the opening. " + err.message,
          payload: null,
        });
      });

    } else{
      return res.status(404).json({
        status: "Error",
        message: "Person not found",
        payload: null,
      });
    }
  })
  .catch((err:Error) => {
    return res.status(500).json({
      status: "error",
      message: "Something happened finding the person. " + err.message,
      payload: null,
    });
  })

}