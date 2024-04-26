import { type RequestHandler, type Request, type Response } from "express";
import { Project } from "../models/project/projects";
import { Position } from "../models/position/positions";
import { ExpirationDateProject } from "../models/project/expiration_date_project";
import { ClosedProject } from "../models/project/closed_project";
import { Client } from "../models/client/clients";
import { Entity } from "../models/ticketLog/entities";


const GENERAL_STATUS = ["In Preparation", "Active", "Closed"];

export const createProject: RequestHandler = async (
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

  const {
    has_expiration_date,
    expiration_date,
    project_title,
    project_description,
    start_date,
    general_status,
    closed_status,
    closed_reason,
    client_id,
  } = req.body;

  if (
    !project_title ||
    !project_description ||
    !start_date ||
    !general_status ||
    !client_id ||
    typeof has_expiration_date !== "boolean"
  ) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
      payload: null,
    });
  }

  

  if (!GENERAL_STATUS.includes(general_status)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid general status provided",
      payload: null,
    });
  }

  if (has_expiration_date && !expiration_date) {
    return res.status(400).json({
      status: "error",
      message: "Expiration date not provided",
      payload: null,
    });
  }

  if (general_status == "Closed") {
    if (!closed_status || !closed_reason) {
      return res.status(400).json({
        status: "error",
        message: "Closed status or reason not provided",
        payload: null,
      });
    }

    if (!["Completed", "Cancelled"].includes(closed_status)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid closed status provided",
        payload: null,
      });
    }
  }

  Client.findByPk(client_id)
  .then(async (data: Client | null) => {
    if(!data){
      return res.status(404).json({
        status: "Error",
        message: "Client not found",
        payload: null,
      });
    } else{
      try {
        const project = await Project.create({ ...req.body })
    
        .then(async (data: Project) => {
          const entityData = await Entity.create({
            type: "Project",
            isDeleted: false,
            belongs_to_id: data.id,
          });
          entityData.project_id = data.id;
          await entityData.save();
          return data;
        })
    
    
        if (has_expiration_date) {
          await ExpirationDateProject.create({
            project_id: project.id,
            expiration_date,
          }).catch((error: Error) => {
            return res.status(500).json({
              status: "Error",
              message: "There was an error creating the expiration date",
              payload: error.message,
            });
          });
        }
    
        if (general_status == "Closed") {
          await ClosedProject.create({
            project_id: project.id,
            closed_status,
            closed_reason,
          }).catch((error: Error) => {
            return res.status(500).json({
              status: "Error",
              message: "There was an error creating the closed project",
              payload: error.message,
            });
          });
        }
    
        return res.status(201).json({
          status: "Success",
          message: "Project created successfully",
          payload: project,
        });
      } catch (error: unknown) {
        return res.status(500).json({
          status: "Error",
          message: "Project not created",
          payload: (error as Error).message,
        });
      }
    }
  })
  .catch((error: Error) => {
    return res.status(500).json({
      status: "Error",
      message: "Project not created",
      payload: error.message,
    });
  });

};

export const getProjects: RequestHandler = async (
  req: Request,
  res: Response
) => {
  Project.findAll({
    include: [
      {
        model: Position,
      },
      {
        model: ExpirationDateProject
      }
    ],
  })
    .then((data: Project[] | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Projects retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Projects not retrieved",
        payload: error.message,
      });
    });
};

export const updateProject: RequestHandler = async (
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

  const id = req.params.id;

  //Validations
  const {
    has_expiration_date,
    expiration_date,
    project_title,
    project_description,
    start_date,
    general_status,
    closed_status,
    closed_reason,
    client_id,
  } = req.body;

  if (
    !project_title ||
    !project_description ||
    !start_date ||
    !general_status ||
    !client_id ||
    typeof has_expiration_date !== "boolean"
  ) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
      payload: null,
    });
  }

  if (!GENERAL_STATUS.includes(general_status)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid general status provided",
      payload: null,
    });
  }

  if (has_expiration_date && !expiration_date) {
    return res.status(400).json({
      status: "error",
      message: "Expiration date not provided",
      payload: null,
    });
  }

  if (general_status == "Closed") {
    if (!closed_status || !closed_reason) {
      return res.status(400).json({
        status: "error",
        message: "Closed status or reason not provided",
        payload: null,
      });
    }

    if (!["Completed", "Cancelled"].includes(closed_status)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid closed status provided",
        payload: null,
      });
    }
  }

  Client.findByPk(client_id)
  .then((data: Client | null) => {
    if(!data){
      return res.status(404).json({
        status: "Error",
        message: "Client not found",
        payload: null,
      });
    } else{
      
      //check project exists
      Project.findByPk(id)
      .then((data: Project | null) => {
        if (data) {
          if (data.general_status === "Closed") {
            return res.status(400).json({
              status: "error",
              message: "Project status is 'Cancelled' and cannot be updated",
              payload: null,
            });
          }

          if (has_expiration_date) {
            ExpirationDateProject.findOne({
              where: {
                project_id: id,
              },
            }).then((prevExpDate: ExpirationDateProject | null) => {
              if (prevExpDate) {
                prevExpDate
                  .update({ expiration_date }) //if there is a previous expiration date update it
                  .then((isUpdatedExpiration) => {
                    if (!isUpdatedExpiration) {
                      return res.status(500).json({
                        status: "Success",
                        message:
                          "Something happened updating the project (Expiration Date)",
                        payload: null,
                      });
                    }
                  });
              } else {
                ExpirationDateProject.create({
                  //if there isn't one create it
                  project_id: Number(id),
                  expiration_date,
                });
              }
            });
          } else {
            ExpirationDateProject.destroy({
              //if has_expiration_date is false destroy associated expiration date if any
              where: {
                project_id: Number(id),
              },
            });
          }

          Project.update({ ...req.body }, { where: { id } })
            .then((isUpdated) => {
              if (isUpdated) {
                return res.status(200).json({
                  status: "Success",
                  message: "Project updated successfully",
                  payload: { ...req.body },
                });
              }
              return res.status(500).json({
                status: "Success",
                message: "Something happened updating the project",
                payload: null,
              });
            })
            .catch((error: Error) => {
              return res.status(500).json({
                status: "Error",
                message: `Project not updated: ${error.message}`,
                payload: null,
              });
            });
        } else {
          return res.status(404).json({
            status: "error",
            message: "Project not found",
            payload: null,
          });
        }
      })
      .catch((error: Error) => {
        return res.status(500).json({
          status: "Error",
          message: "Error updating Project",
          payload: error.message,
        });
      });
    }
  })
  .catch((error: Error) => {
    return res.status(500).json({
      status: "Error",
      message: "Project not created",
      payload: error.message,
    });
  });
};

export const deleteProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;

  //Make sure the project exists
  Project.findByPk(id)
    .then((data: Project | null) => {
      if (data) {
        Project.destroy({ where: { id } }).then((isDeleted) => {
          if (isDeleted) {
            Entity.findOne( {
              where: {
                  belongs_to_id: id,
                  type: "Project"
              }} )
              .then((entity: Entity | null) =>{
                  if(entity){
                      entity.update({isDeleted: true})
                  }
              })

            return res.status(200).json({
              status: "Success",
              message: "Project deleted successfully",
              payload: { ...req.body },
            });
          }
          return res.status(500).json({
            status: "Error",
            message: "Project not deleted",
            payload: null,
          });
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "Project not found",
          payload: null,
        });
      }
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Error deleting Project",
        payload: error.message,
      });
    });
};

export const getProjectById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Project.findByPk(id, {
    include: [
      {
        model: Position,
      },
      {
        model: ExpirationDateProject
      }
    ],
  })
    .then((data: Project | null) => {
      if (data) {
        return res.status(200).json({
          status: "Success",
          message: "Project retrieved successfully",
          payload: data,
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "Project not found",
          payload: null,
        });
      }
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Project not retrieved",
        payload: error.message,
      });
    });
};

export const getJobPositionsByProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Project.findByPk(id)
    .then((data: Project | null) => {
      if (data) {
        data.getPositions().then((positions: Position[]) => {
          return res.status(200).json({
            status: "Success",
            message: "Positions retrieved successfully",
            payload: positions,
          });
        });
      } else {
        return res.status(404).json({
          status: "Error",
          message: "Project not found",
          payload: null,
        });
      }
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Project not retrieved",
        payload: error.message,
      });
    });
};

export const createPositionByProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  if (!req.body || !id) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  Project.findByPk(id)
    .then((data: Project | null) => {
      if (data) {
        Position.create({ ...req.body, project: id })
          .then((data: Position) => {
            return res.status(201).json({
              status: "Success",
              message: "Position created successfully",
              payload: data,
            });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              status: "Error",
              message: "Position not created",
              payload: error.message,
            });
          });
      } else {
        return res.status(404).json({
          status: "Error",
          message: "Project not found",
          payload: null,
        });
      }
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Project not retrieved",
        payload: error.message,
      });
    });
};

export const deletePositionByProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;
  const proj_id = req.params.id;

  Project.findByPk(proj_id)
    .then((data: Project | null) => {
      if (data) {
        Position.destroy({ where: { id } })
          .then(() => {
            return res.status(200).json({
              status: "Success",
              message: "Position deleted successfully",
              payload: null,
            });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              status: "Error",
              message: "Position not deleted",
              payload: error.message,
            });
          });
      } else {
        return res.status(404).json({
          status: "Error",
          message: "Project not found",
          payload: null,
        });
      }
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Project not retrieved",
        payload: error.message,
      });
    });
};
