import { RequestHandler, Request, Response } from "express";
import { Application } from "../models/position/applications";
import { Position } from "../models/position/positions";
import { Person } from "../models/person/people";
import { Employee } from "../models/person/employees";
import { Pipeline } from "../models/person/pipeline";

export const createApplication: RequestHandler = async (
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

  const {application_status, position_id, person_id} = req.body;

  if(!application_status || !person_id || !position_id){
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
      message: "Application not created",
      payload: error.message,
    });
  });

  //Make sure person exists
  Person.findByPk(person_id)
  .then((data: Person | null) => {
    if(!data){
      return res.status(404).json({
        status: "Error",
        message: "Person not found",
        payload: null,
      });
    }
  })
  .catch((error: Error) => {
    return res.status(500).json({
      status: "Error",
      message: "Application not created",
      payload: error.message,
    });
  });

  if(!["Accepted", "Rejected", "Scheduled For Interview", "Waiting on Client Response", "On Hold"].includes(application_status)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid status provided',
        payload: null
    });
  }

  Application.create({ ...req.body })
    .then((data: Application) => {
      return res.status(201).json({
        status: "Success",
        message: "Application created successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Application not created",
        payload: error.message,
      });
    });
};

export const getAllApplications: RequestHandler = async (
  req: Request,
  res: Response
) => {
  Application.findAll({
    include: { 
        model: Person,
        include: [Employee, Pipeline]
    }
  })
    .then((data: Application[] | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Applications retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Applications not retrieved",
        payload: error.message,
      });
    });
};

export const modifyApplication: RequestHandler = async (
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

  const {application_status, position_id, person_id} = req.body;

  if(!application_status){
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required',
      payload: null
    });
  }

  if(position_id || person_id){
    return res.status(400).json({
      status: 'error',
      message: 'Job position and candidate can not be modified',
      payload: null
    });
  }

  if(!["Accepted", "Rejected", "Scheduled For Interview", "Waiting on Client Response", "On Hold"].includes(application_status)) {
    return res.status(400).json({ 
        status: 'error',
        message: 'Invalid division provided',
        payload: null
    });
  }

  Application.update({ ...req.body }, { where: { id } })
    .then((isUpdated) => {
      if (isUpdated) {
        return res.status(200).json({
          status: "Success",
          message: "Application updated successfully",
          payload: { ...req.body },
        });
      }
      return res.status(500).json({
        status: "Success",
        message: "Something happened updating the application",
        payload: null,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: `Application not updated: ${error.message}`,
        payload: null,
      });
    });
};

export const deleteApplication: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;

  Application.findByPk(id)
    .then((data: Application | null) => {
        if(data){
            Application.destroy({ where: { id } })
                .then((isDeleted) => {
                    if (isDeleted) {
                        return res.status(200).json({
                        status: "Success",
                        message: "Application deleted successfully",
                        payload: { ...req.body },
                        });
                    }
                    return res.status(500).json({
                        status: "Error",
                        message: "Application not deleted",
                        payload: null,
                    });
                })
                .catch((error: Error) => {
                    return res.status(500).json({
                        status: "Error",
                        message: "Error deleting application",
                        payload: error.message,
                    });
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

export const getApplicationById: RequestHandler = async (
  req: Request,
  res: Response
) => {

  const id = req.params.id;
  Application.findByPk(id, {
    include: { 
        model: Person,
        include: [Employee, Pipeline]
    }
})
    .then((data: Application | null) => {
        if(data){
            return res.status(200).json({
                status: "Success",
                message: "Application retrieved successfully",
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
        message: "Application not retrieved",
        payload: error.message,
      });
    });
};
