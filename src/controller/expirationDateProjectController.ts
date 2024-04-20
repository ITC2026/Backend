import { RequestHandler, Request, Response } from "express";
import { ExpirationDateProject } from "../models/project/expiration_date_project"
import { Project } from "../models/project/projects";

//Get all Project Expiration Dates
export const getAllExpirationDateProjects: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    ExpirationDateProject.findAll({})
      .then((data: ExpirationDateProject[] | null) => {
        return res.status(200).json({
          status: "Success",
          message: "Project Expiration Dates retrieved successfully",
          payload: data,
        });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          status: "Error",
          message: "Project Expiration Dates not retrieved",
          payload: error.message,
        });
      });
};

//Find a single Project Expiration Date with an id.
export const getExpirationDateProjectById: RequestHandler = (req:Request, res:Response) => {
    ExpirationDateProject.findByPk(req.params.id)
    .then((data: ExpirationDateProject | null) => {
        if (data) {
            return res.status(200).json({
                status: 'success',
                message: 'Project Expiration Date retrieved successfully',
                payload: data
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'Project Expiration Date not found',
                payload: null
            });
        }
    })
    .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "There was an error retrieving the Project Expiration Date." + err.message,
            payload: null,
        });
    });
};

//!These next functions are already handled within the Project controller.
//!There is no need to use them. They are here just in case.

//Create and Save a new Project Expiration Date
export const createExpirationDateProject: RequestHandler = (req:Request, res:Response) => {
    if(!req.body){
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const {project_id } = req.body;

//Make sure the project exists
Project.findByPk(project_id)
.then((data: Project | null) => {
    if(!data){
        return res.status(404).json({
            status: "Error",
            message: "Project not found",
            payload: null,
        });
    }
            //If project exists create the Expiration Date for it
    else{
        ExpirationDateProject.create({...req.body})
        .then((data: ExpirationDateProject | null) => {
            res.status(200).json({
                status: "success",
                message: "Project Expiration Date created successfully",
                payload: data,
            });
        })
        .catch((err:Error) => {
            res.status(500).json({
                status: "error",
                message: "There was an error creating the Project Expiration Date" + err.message,
                payload: null,
            });
        });
    }
})
.catch ((err:Error) => {
    res.status(500).json({
        status: "error",
        message: "There was an error finding the associated project" + err.message,
        payload: null,
    });
});
    
};

//Update a Project Expiration Date
export const updateExpirationDateProject: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const id = req.params.id;

    const {project_id} = req.body;
    
    ExpirationDateProject.findByPk(id)
    .then((data: ExpirationDateProject | null) => {
      if(data){

        if(project_id){
          Project.findByPk(project_id)
          .then((data: Project | null) => {
            if(!data){
              return res.status(404).json({
                status: 'error',
                message: 'Associated project not found',
                payload: null
              });
            } else{
                  
              ExpirationDateProject.update(req.body, { where: { id } })
              .then((isUpdated) => {
                return res.status(200).json({
                  status: "Success",
                  message: "Project Expiration Date updated successfully",
                  payload: isUpdated,
                });
              })
              .catch((error: Error) => {
                return res.status(500).json({
                  status: "Error",
                  message: "Project Expiration Date not updated",
                  payload: error.message,
                });
              });
            }
          })
          .catch((error:Error) => {
            return res.status(500).json({
              status: "Error",
              message: "There was an error finding the associated project.",
              payload: error.message,
            });
          });

        } else{
          ExpirationDateProject.update(req.body, { where: { id } })
          .then((isUpdated) => {
            return res.status(200).json({
              status: "Success",
              message: "Project Expiration Date updated successfully",
              payload: isUpdated,
            });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              status: "Error",
              message: "Project Expiration Date not updated",
              payload: error.message,
            });
          });
        }

      } else {
        return res.status(404).json({
          status: 'error',
          message: 'Project Expiration Date not found',
          payload: null
        });
      }
    })
    .catch((error:Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Project Expiration Date not updated",
        payload: error.message,
      });
    });
};

//Delete a Project Expiration Date
export const deleteExpirationDateProject: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const id = req.body.id;
  
    ExpirationDateProject.findByPk(id)
    .then((data: ExpirationDateProject | null) => {
        if (data) {
  
          ExpirationDateProject.destroy({ where: { id } })
            .then((isDeleted) => {
              if (isDeleted) {
                return res.status(200).json({
                  status: "Success",
                  message: "Project Expiration Date deleted successfully",
                  payload: { ...req.body },
                });
  
              } else{
                return res.status(500).json({
                  status: "Error",
                  message: "Project Expiration Date not deleted",
                  payload: null,
                });
              }
            })
            .catch((error: Error) => {
              return res.status(500).json({
                status: "Error",
                message: "Error deleting Project Expiration Date",
                payload: error.message,
              });
            });
        } else {
            return res.status(404).json({
              status: 'error',
              message: 'Project Expiration Date not found',
              payload: null
          });
        }
      })
      .catch((error: Error) => {
        return res.status(500).json({
          status: "Error",
          message: "Error finding Project Expiration Date",
          payload: error.message,
        });
    });
};

