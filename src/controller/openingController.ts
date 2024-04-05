import { RequestHandler, Request, Response } from "express";
import { Opening } from "../models/position/openings";
import { Person } from "../models/person/people";
import { Employee } from "../models/person/employees";
import { ExpirationDateOpening } from "../models/position/expiration_date_openings";
import { Position } from "../models/position/positions";

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

  //Make sure position exists
  Position.findByPk(position_id)
  .then((data: Position | null) => {
    if(!data){
      return res.status(404).json({
        status: "Error",
        message: "Position not found",
        payload: null,
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

  if (has_expiration_date && !expiration_date) {
    return res.status(400).json({
      status: 'error',
      message: 'Expiration date not provided',
      payload: null
    });
  }

  if(!["New", "Filled", "Closed", "In progress", "On standby"].includes(opening_status)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid status provided',
        payload: null
    });
  }

  if(!["InProgress", "OnStandby", "Hired", "Replacement", "Budget problem", "Filled by itself", "Filled by another", "No replied"].includes(opening_reason)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid reason provided',
        payload: null
    });
  }

  Opening.create(req.body)
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
};

export const getOpenings: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    
    Opening.findAll({ 
      include: { 
        model: Person,
        include: [Employee]
      }
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
  Opening.findByPk(id,
    {
      include: { 
        model: Person,
        include: [Employee]
      }
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

  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  const {opening_status, start_date, has_expiration_date, expiration_date, position_id, person_id, opening_reason} = req.body;

  //Verify required fields are filled
  if(!opening_status || !opening_reason || !start_date || !position_id || typeof has_expiration_date !== 'boolean'){
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required',
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
    }
  })
  .catch((error: Error) => {
    return res.status(500).json({
      status: "Error",
      message: "Opening not created",
      payload: error.message,
    });
  });

  //Si se agrega el id de una persona, asegurarse de que existe
  if(person_id){
    Position.findByPk(position_id)
      .then((data: Position | null) => {
        if(!data){
          return res.status(404).json({
            status: "Error",
            message: "Position not found",
            payload: null,
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
  }

  if (has_expiration_date && !expiration_date) {
    return res.status(400).json({
      status: 'error',
      message: 'Expiration date not provided',
      payload: null
    });
  }

  if(!["New", "Filled", "Closed", "In progress", "On standby"].includes(opening_status)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid status provided',
        payload: null
    });
  }

  if(!["InProgress", "OnStandby", "Hired", "Replacement", "Budget problem", "Filled by itself", "Filled by another", "No replied"].includes(opening_reason)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid reason provided',
        payload: null
    });
  }

  Opening.findByPk(id)
  .then((data: unknown | null) => {
    if(data){

      if(has_expiration_date){
        ExpirationDateOpening.findOne({
          where: {
            opening_id: id
          }
        })
        .then((prevExpDate: ExpirationDateOpening | null) => {

          if(prevExpDate){
            prevExpDate.update({expiration_date})   //if there is a previous expiration date update it
            .then((isUpdatedExpiration) => {

              if(!isUpdatedExpiration){
                return res.status(500).json({
                  status: "Error",
                  message: "Something happened updating the opening (Expiration Date)",
                  payload: null,
                });
              }
            });
          } else{
              ExpirationDateOpening.create( {   //if there isn't one create it
                opening_id: Number(id),
                expiration_date,
              })
              .catch((error: Error) => {
                return res.status(500).json({
                  status: "Error",
                  message: "Opening not updated",
                  payload: error.message,
                });
              });
          }
        })
        .catch((error: Error) => {
          return res.status(500).json({
            status: "Error",
            message: "Opening not updated",
            payload: error.message,
          });
        });
        
      } else{
        ExpirationDateOpening.destroy({    //if has_expiration_date is false destroy associated expiration date if any
          where: {
            opening_id: Number(id)
          }
        })
        .catch((error: Error) => {
          return res.status(500).json({
            status: "Error",
            message: "Opening not updated",
            payload: error.message,
          });
        });
      }

      Opening.update( req.body, { where: { id } })
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

