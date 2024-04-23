import { RequestHandler, Request, Response } from "express";
import { Opening } from "../models/position/openings";
import { Person } from "../models/person/people";
import { Employee } from "../models/person/employees";
import { ExpirationDateOpening } from "../models/position/expiration_date_openings";
import { Position } from "../models/position/positions";
import { Entity } from "../models/ticketLog/entities";
import { Project } from "../models/project/projects";
import { Client } from "../models/client/clients";

export const createOpening: RequestHandler = async (
  req: Request,
  res: Response
) => {

  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  const {opening_status, start_date, has_expiration_date, expiration_date, position_id, opening_reason} = req.body;

  //Verify required fields are filled
  if(!opening_status || !opening_reason || !start_date || !position_id || typeof has_expiration_date !== 'boolean'){
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required',
      payload: null
    });
  }

  if (has_expiration_date && !expiration_date) {
    return res.status(400).json({
      status: 'error',
      message: 'Expiration date not provided',
      payload: null
    });
  }

  if(!["New", "Filled", "Closed", "In Progress", "On Standby"].includes(opening_status)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid status provided',
        payload: null
    });
  }

  if(!["In Progress", "On Standby", "Hired", "Replacement", "Budget Problem", "Filled By Itself", "Filled By Another", "No replied"].includes(opening_reason)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid reason provided',
        payload: null
    });
  }

  //Make sure position exists
  Position.findByPk(position_id)
  .then((data: Position | null) => {
    if(!data){
      return res.status(404).json({
        status: "Error",
        message: "Position not found",
        payload: null,
      });
    } else{
      
      Opening.create(req.body)
      .then(async (data: Opening) => {
        const entityData = await Entity.create({
          type: "Opening",
          isDeleted: false,
          belongs_to_id: data.id,
        });
        entityData.opening_id = data.id;
        await entityData.save();
        return data;
      })
          .then((data: Opening) => {

          if (has_expiration_date) {
              ExpirationDateOpening.create({
              opening_id: data.id,
              expiration_date,
            })
            
            .catch((error: Error) => {
              return res.status(500).json({
                status: "Error",
                message: "There was an error creating the expiration date",
                payload: error.message,
              });
            });
          }
          
          return res.status(201).json({
            status: "Success",
            message: "Opening created successfully",
            payload: data,
          });
        })
        .catch((error: Error) => {
          return res.status(500).json({
            status: "Error",
            message: "Opening not created",
            payload: error.message,
          });
        });
    }
  })
  .catch((error: Error) => {
    return res.status(500).json({
      status: "Error",
      message: "Opening not created",
      payload: error.message,
    });
  });
};

export const getOpenings: RequestHandler = async (
  req: Request,
  res: Response
) => {
  Opening.findAll({
    include: {
      model: Person,
      include: [Employee]
    },
  })
    .then((data: Opening[] | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Openings retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Openings not retrieved",
        payload: error.message,
      });
    });
};

export const getOpeningById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Opening.findByPk(id, {
    include: {
      model: Person,
    },
  })
    .then((data: unknown | null) => {
      if(data){
        return res.status(200).json({
          status: "Success",
          message: "Opening retrieved successfully",
          payload: data,
        });
      } else{
        return res.status(404).json({
          status: "Error",
          message: "Opening not found",
          payload: null,
        });
      }
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Opening not retrieved",
        payload: error.message,
      });
    });
};

export const updateOpening: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const {person_id} = req.body;

  Opening.findByPk(id)
  .then((data: Opening | null) => {
    if(data){

      if(person_id){    // If a person is added to the opening
        Person.findByPk(person_id)
        .then((person: Person | null) => {

          if(person){     //Check the person exists

            Position.findByPk(data.position_id)
            .then((position:Position | null) =>{

              if(position){   // Check for position

                Project.findByPk(position.project_id)
                .then((project:Project | null) => {

                  if(project){    // Check for project

                    Client.findByPk(project.client_id)
                    .then((client: Client | null) => {

                      if(client){   // Check for client
                        client.$add("people", person);  // Create client_person relation

                      } else{
                        return res.status(404).json({
                          status: 'error',
                          message: 'Client not found',
                          payload: null
                        });
                      }
                    })
                    .catch((error:Error) => {
                      return res.status(500).json({
                        status: "Error",
                        message: "Opening not updated",
                        payload: error.message,
                      });
                    })

                  } else{
                    return res.status(404).json({
                      status: 'error',
                      message: 'Project not found',
                      payload: null
                    });
                  }
                })
                .catch((error:Error) => {
                  return res.status(500).json({
                    status: "Error",
                    message: "Opening not updated",
                    payload: error.message,
                  });
                })

              } else{
                return res.status(404).json({
                  status: 'error',
                  message: 'Position not found',
                  payload: null
                });
              }
            })
            .catch((error:Error) => {
              return res.status(500).json({
                status: "Error",
                message: "Opening not updated",
                payload: error.message,
              });
            })

          } else{
            return res.status(404).json({
              status: 'error',
              message: 'Person not found',
              payload: null
            });
          }
        })
        .catch((error:Error) => {
          return res.status(500).json({
            status: "Error",
            message: "Opening not updated",
            payload: error.message,
          });
        });
      }

      Opening.update(req.body, { where: { id } })
        .then((isUpdated) => {
          return res.status(200).json({
            status: "Success",
            message: "Opening updated successfully",
            payload: isUpdated,
          });
        })
        .catch((error: Error) => {
          return res.status(500).json({
            status: "Error",
            message: "Opening not updated",
            payload: error.message,
          });
        });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Opening not found',
        payload: null
      });
    }
  })
  .catch((error:Error) => {
    return res.status(500).json({
      status: "Error",
      message: "Opening not updated",
      payload: error.message,
    });
  });
};

export const deleteOpening: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.body.id;

  Opening.findByPk(id)
  .then((data: unknown | null) => {
    if(data){
      Opening.destroy({ where: { id } })
      .then((isDeleted) => {
        Entity.findOne( {
          where: {
              belongs_to_id: id,
              type: "Opening"
          }} )
          .then((entity: Entity | null) =>{
              if(entity){
                  entity.update({isDeleted: true})
              }
          })
        return res.status(200).json({
          status: "Success",
          message: "Opening deleted successfully",
          payload: isDeleted,
        });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          status: "Error",
          message: "Opening not deleted",
          payload: error.message,
        });
      });
      
    } else{
      return res.status(404).json({
        status: "Error",
        message: "Opening not found",
        payload: null,
      });
    }
  })
  .catch((error: Error) => {
    return res.status(500).json({
      status: "Error",
      message: "Opening not deleted",
      payload: error.message,
    });
  });
};
