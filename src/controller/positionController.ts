import { RequestHandler, Request, Response } from "express";
import { Position } from "../models/position/positions";
import { Opening } from "../models/position/openings";
import { Project } from "../models/project/projects";
import { Application } from "../models/position/applications";
import { CommentPosition } from "../models/position/comments_positions";

export const createPosition: RequestHandler = async (
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

  const { position_title, division, region, tech_stack, bill_rate, posting_type, is_cross_division, is_exclusive, working_hours, comment, project_id } = req.body;

  //Verify required fields are filled
  if(!position_title || !division || !region || !tech_stack || !bill_rate || !posting_type || typeof is_cross_division !== 'boolean'|| typeof is_exclusive !== 'boolean' || !working_hours || !project_id){
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required',
      payload: null
    });
  }

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
  })
  .catch((error: Error) => {
    return res.status(500).json({
      status: "Error",
      message: "Job Position not created",
      payload: error.message,
    });
  });

  //Validations for fields with options
  if(!["BRAZIL", "MEXICO", "CSA", "US"].includes(division)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid division provided',
        payload: null
    });
  }

  if(!["CDMX", "CUU", "HMO", "MID", "SLP", "CAMPINA", "SAO PAULO", "COLOMBIA", "PERU", "COSTA RICA", "ARGENTINA", "DOMINICANA", "DALLAS", "PHOENIX"].includes(region)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid region provided',
        payload: null
    });
  }

  if(!["Java", "React", "Python", "Automation", "Golang", "Javascript", "NET", "Angular", "Appian", "PowerApps", "ManualTester", "Kotlin", "UX", "iOS"].includes(tech_stack)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid division provided',
        payload: null
    });
  }

  if(!["New Headcount", "Backfill Replacement"].includes(posting_type)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid division provided',
        payload: null
    });
  }


  //Create position
  Position.create({ ...req.body })
    .then((data: Position) => {

      //Create comment if there is one
      if(comment){
        CommentPosition.create({
          comment: comment,
          position_id: data.id
        })
        .catch((error: Error) => {
          return res.status(500).json({
            status: "Error",
            message: "Job Position not created",
            payload: error.message,
          });
        });
      }

      return res.status(201).json({
        status: "Success",
        message: "Job Position created successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Job Position not created",
        payload: error.message,
      });
    });
};

export const getPositions: RequestHandler = async (
  req: Request,
  res: Response
) => {
  Position.findAll({ 
    include: [
      { 
        model: Opening
      },
      {
        model: Application
      },
      {
        model: CommentPosition
      }
    ]
  })
    .then((data: unknown[] | null) => {
      if (!data || data.length === 0) {
        return res.status(404).json({
          status: "Error",
          message: "No Job Positions found",
          payload: null,
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Job Positions retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Job Positions not retrieved",
        payload: error.message,
      });
    });
};

export const getPositionById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Position.findByPk(id,
    {
      include: [
        { 
          model: Opening
        },
        {
          model: Application
        },
        {
          model: CommentPosition
        }
      ]
    })
    .then((data: unknown | null) => {
      if (!data) {
        return res.status(404).json({
          status: "Error",
          message: "Job Position not found",
          payload: null,
        });
      }
      return res.status(200).json({
        status: "Success",
        message: "Job Position retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Job Position not retrieved",
        payload: error.message,
      });
    });
};

export const updatePosition: RequestHandler = async (
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

  const { position_title, division, region, tech_stack, bill_rate, posting_type, is_cross_division, is_exclusive, working_hours, comment, project_id } = req.body;

  //Verify required fields are filled
  if(!position_title || !division || !region || !tech_stack || !bill_rate || !posting_type || typeof is_cross_division !== 'boolean'|| typeof is_exclusive !== 'boolean' || !working_hours || !project_id){
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required',
      payload: null
    });
  }

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
  })
  .catch((error: Error) => {
    return res.status(500).json({
      status: "Error",
      message: "Job Position not created",
      payload: error.message,
    });
  });

  //Validations for fields with options
  if(!["BRAZIL", "MEXICO", "CSA", "US"].includes(division)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid division provided',
        payload: null
    });
  }

  if(!["CDMX", "CUU", "HMO", "MID", "SLP", "CAMPINA", "SAO PAULO", "COLOMBIA", "PERU", "COSTA RICA", "ARGENTINA", "DOMINICANA", "DALLAS", "PHOENIX"].includes(region)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid region provided',
        payload: null
    });
  }

  if(!["Java", "React", "Python", "Automation", "Golang", "Javascript", "NET", "Angular", "Appian", "PowerApps", "ManualTester", "Kotlin", "UX", "iOS"].includes(tech_stack)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid division provided',
        payload: null
    });
  }

  if(!["New Headcount", "Backfill Replacement"].includes(posting_type)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid division provided',
        payload: null
    });
  }
  
  //Make sure position exists
  Position.findByPk(id)
  .then((data: Position | null) => {
    if (data) {

      Position.update({ ...req.body }, { where: { id } })
        .then((isUpdated) => {
          if (isUpdated) {
            
            //Update comment
            if(comment){
              CommentPosition.findOne({
                where: {
                  position_id: id
                }
              })
              .then((prevComment: CommentPosition | null) =>{
                
                if(prevComment){
                  prevComment.update({comment})     //if there is a previous comment update it
                  .then((isUpdatedComment) => {

                    if(!isUpdatedComment){
                      return res.status(500).json({
                        status: "Error",
                        message: "Something happened updating the project (Expiration Date)",
                        payload: null,
                      });
                    }
                  });
                } else{
                  CommentPosition.create({    //if there isn't one create it
                    comment: comment,
                    position_id: data.id
                  })
                  .catch((error: Error) => {
                    return res.status(500).json({
                      status: "Error",
                      message: "Job Position not updated",
                      payload: error.message,
                    });
                  });
                }
              })
              .catch((error: Error) => {
                return res.status(500).json({
                  status: "Error",
                  message: "Job Position not updated",
                  payload: error.message,
                });
              });
            } else{
              CommentPosition.destroy({    //if there is no commment destroy associated comment if any
                where: {
                  position_id: id
                }
              })
              .catch((error: Error) => {
                return res.status(500).json({
                  status: "Error",
                  message: "Job Position not updated",
                  payload: error.message,
                });
              });
            }


            return res.status(200).json({
              status: "Success",
              message: "Job Position updated successfully",
              payload: { ...req.body },
            });
          }
          return res.status(500).json({
            status: "Error",
            message: "Job Position not updated",
            payload: null,
          });
        })
        .catch((error: Error) => {
          return res.status(500).json({
            status: "Error",
            message: "Job Position not updated",
            payload: error.message,
          });
        });
    } else{
      return res.status(404).json({
        status: 'error',
        message: 'Job Position not found',
        payload: null
      });
    }
  })
  .catch((error: Error) => {
    return res.status(500).json({
      status: "Error",
      message: "Error updating Job Position",
      payload: error.message,
    });
  });
};

export const deletePosition: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.body.id;

  Position.findByPk(id)
  .then((data: Position | null) => {
      if (data) {

        Position.destroy({ where: { id } })
          .then((isDeleted) => {
            if (isDeleted) {
              return res.status(200).json({
                status: "Success",
                message: "Job Position deleted successfully",
                payload: { ...req.body },
              });

            }
            return res.status(500).json({
              status: "Error",
              message: "Job Position not deleted",
              payload: null,
            });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              status: "Error",
              message: "Error deleting Job Position",
              payload: error.message,
            });
          });
      } else {
          return res.status(404).json({
            status: 'error',
            message: 'Job Position not found',
            payload: null
        });
      }
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Error deleting Job Position",
        payload: error.message,
      });
    });
};

export const getOpeningsByPosition: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Position.findByPk(id)
    .then((data: Position | null) => {
      if (data) {
        data.getOpenings().then((openings: Opening[]) => {
          return res.status(200).json({
            status: "Success",
            message: "Openings retrieved successfully",
            payload: openings,
          });
        });
      } else {
        return res.status(404).json({
          status: "Error",
          message: "Job Position not found",
          payload: null,
        });
      }
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Openings not retrieved",
        payload: error.message,
      });
    });
};
