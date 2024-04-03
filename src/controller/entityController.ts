import { RequestHandler, Request, Response } from "express";
import { Entity } from "../models/ticketLog/entities";
import { Client } from "../models/client/clients";
import { Project } from "../models/project/projects";
import { Position } from "../models/position/positions";
import { Opening } from "../models/position/openings";
// import { Application } from "../models/position/applications";
// import { Person } from "../models/person/people";
import { User } from "../models/user/user";

export const createEntity: RequestHandler = async (
  req: Request,
  res: Response
) => {
  // Validations
  if(!req.body){
    return res.status(400).json({
        status: "error",
        message: "Content can not be empty",
        payload: null,
    });
  }
  const { type, isDeleted, belongs_to_id } = req.body;

  if (!type || !isDeleted || !belongs_to_id) {
    return res.status(400).json({
        status: 'error',
        message: 'Type, whether it is deleted or not, and ID it belongs to are required',
        payload: null
    });
  }

  // Verificar si el valor de type es válido
  if (!['Client', 'Project', 'Position', 'Opening', 'Application', 'Person', 'User'].includes(type)) {
    return res.status(400).json({ message: 'Invalid type provided' });
  }
  const entity = {
    type: type,
    isDeleted: isDeleted,
    belongs_to_id: belongs_to_id
  };

  // Verify if the isDeleted value is valid
  if (!['true', 'false'].includes(isDeleted)) {
    return res.status(400).json({ message: 'Invalid isDeleted value provided' });
  }

  // Verify if the belongs_to_id value is valid
  if (![Client, Project, Position, Opening, User].includes(belongs_to_id)) {
    return res.status(400).json({
        status: 'error',
        message: 'Invalid ID it belongs to provided',
        payload: null
    });
  }
  // if (![type.].includes(belongs_to_id)) {
  //   return res.status(400).json({
  //       status: 'error',
  //       message: 'Invalid ID it belongs to provided',
  //       payload: null
  //   });
  // }

  Entity.create(entity)
    .then((data: unknown) => {
      return res.status(201).json({
        status: "Success",
        message: "Entity created successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Entity not created",
        payload: error.message,
      });
    });
};

export const getEntities: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    Entity.findAll()
      .then((data: unknown[] | null) => {
        if (!data || data.length === 0) {
          return res.status(404).json({
            status: "Error",
            message: "No Entities found",
            payload: null,
          });
        }
  
        return res.status(200).json({
          status: "Success",
          message: "Entities retrieved successfully",
          payload: data,
        });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          status: "Error",
          message: "Entities not retrieved",
          payload: error.message,
        });
      });
};

export const getEntityById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Entity.findByPk(id)
    .then((data: unknown | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Entity retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Entity not retrieved",
        payload: error.message,
      });
    });
};

export const modifyEntity: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Entity.update( req.body, { where: { id } })
    .then((isUpdated) => {
      return res.status(200).json({
        status: "Success",
        message: "Entity updated successfully",
        payload: isUpdated,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Entity not updated",
        payload: error.message,
      });
    });
};

export const deleteEntity: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.body.id;
  Entity.destroy({ where: { id } })
    .then((isDeleted) => {
      return res.status(200).json({
        status: "Success",
        message: "Entity deleted successfully",
        payload: isDeleted,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Entity not deleted",
        payload: error.message,
      });
    });
};

