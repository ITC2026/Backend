import { RequestHandler, Request, Response } from "express";
import { ExpirationDateOpening } from "../models/position/expiration_date_openings";
import { Opening } from "../models/position/openings";

//Get all Opening Expiration Dates
export const getAllExpirationDateOpenings: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    ExpirationDateOpening.findAll({})
      .then((data: ExpirationDateOpening[] | null) => {
        return res.status(200).json({
          status: "Success",
          message: "Opening Expiration Dates retrieved successfully",
          payload: data,
        });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          status: "Error",
          message: "Opening Expiration Dates not retrieved",
          payload: error.message,
        });
      });
};

//Find a single Opening Expiration Date with an id.
export const getExpirationDateOpeningById: RequestHandler = (req:Request, res:Response) => {
    ExpirationDateOpening.findByPk(req.params.id)
    .then((data: ExpirationDateOpening | null) => {
        if (data) {
            return res.status(200).json({
                status: 'success',
                message: 'Opening Expiration Date retrieved successfully',
                payload: data
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'Opening Expiration Date not found',
                payload: null
            });
        }
    })
    .catch((err:Error) => {
        return res.status(500).json({
            status: "error",
            message: "There was an error retrieving the Opening Expiration Date." + err.message,
            payload: null,
        });
    });
};

//!These next functions are already handled within the Opening controller.
//!There is no need to use them. They are here just in case.

//Create and Save a new Opening Expiration Date
export const createExpirationDateOpening: RequestHandler = (req:Request, res:Response) => {
    if(!req.body){
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const {opening_id } = req.body;

//Make sure the opening exists
Opening.findByPk(opening_id)
.then((data: Opening | null) => {
    if(!data){
        return res.status(404).json({
            status: "Error",
            message: "Opening not found",
            payload: null,
        });
    }
            //If opening exists create the Expiration Date for it
    else{
        ExpirationDateOpening.create({...req.body})
        .then((data: ExpirationDateOpening | null) => {
            res.status(200).json({
                status: "success",
                message: "Opening Expiration Date created successfully",
                payload: data,
            });
        })
        .catch((err:Error) => {
            res.status(500).json({
                status: "error",
                message: "There was an error creating the Opening Expiration Date" + err.message,
                payload: null,
            });
        });
    }
})
.catch ((err:Error) => {
    res.status(500).json({
        status: "error",
        message: "There was an error finding the associated opening" + err.message,
        payload: null,
    });
});
    
};

//Update a Opening Expiration Date
export const updateExpirationDateOpening: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const id = req.params.id;

    const {opening_id} = req.body;
    
    ExpirationDateOpening.findByPk(id)
    .then((data: ExpirationDateOpening | null) => {
      if(data){

        if(opening_id){
          Opening.findByPk(opening_id)
          .then((data: Opening | null) => {
            if(!data){
              return res.status(404).json({
                status: 'error',
                message: 'Associated opening not found',
                payload: null
              });
            } else{
                  
              ExpirationDateOpening.update(req.body, { where: { id } })
              .then((isUpdated) => {
                return res.status(200).json({
                  status: "Success",
                  message: "Opening Expiration Date updated successfully",
                  payload: isUpdated,
                });
              })
              .catch((error: Error) => {
                return res.status(500).json({
                  status: "Error",
                  message: "Opening Expiration Date not updated",
                  payload: error.message,
                });
              });
            }
          })
          .catch((error:Error) => {
            return res.status(500).json({
              status: "Error",
              message: "There was an error finding the associated opening.",
              payload: error.message,
            });
          });

        } else{
          ExpirationDateOpening.update(req.body, { where: { id } })
          .then((isUpdated) => {
            return res.status(200).json({
              status: "Success",
              message: "Opening Expiration Date updated successfully",
              payload: isUpdated,
            });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              status: "Error",
              message: "Opening Expiration Date not updated",
              payload: error.message,
            });
          });
        }

      } else {
        return res.status(404).json({
          status: 'error',
          message: 'Opening Expiration Date not found',
          payload: null
        });
      }
    })
    .catch((error:Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Opening Expiration Date not updated",
        payload: error.message,
      });
    });
};

//Delete a Opening Expiration Date
export const deleteExpirationDateOpening: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const id = req.body.id;
  
    ExpirationDateOpening.findByPk(id)
    .then((data: ExpirationDateOpening | null) => {
        if (data) {
  
          ExpirationDateOpening.destroy({ where: { id } })
            .then((isDeleted) => {
              if (isDeleted) {
                return res.status(200).json({
                  status: "Success",
                  message: "Opening Expiration Date deleted successfully",
                  payload: { ...req.body },
                });
  
              } else{
                return res.status(500).json({
                  status: "Error",
                  message: "Opening Expiration Date not deleted",
                  payload: null,
                });
              }
            })
            .catch((error: Error) => {
              return res.status(500).json({
                status: "Error",
                message: "Error deleting Opening Expiration Date",
                payload: error.message,
              });
            });
        } else {
            return res.status(404).json({
              status: 'error',
              message: 'Opening Expiration Date not found',
              payload: null
          });
        }
      })
      .catch((error: Error) => {
        return res.status(500).json({
          status: "Error",
          message: "Error finding Opening Expiration Date",
          payload: error.message,
        });
    });
};

