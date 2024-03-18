
import { RequestHandler, Request, Response } from "express";
import { Position } from "../models/positions"; // Import the Position model

export const createPosition: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { title, description, vacancies, publication_type, cross_division, division, region, tech_stack, demand_curation, exclusivity, id_vacancy, id_project } = req.body;
  Position.create({ title, description, vacancies, publication_type, cross_division, division, region, tech_stack, demand_curation, exclusivity, id_vacancy, id_project })
    .then((data: unknown) => {
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
};

export const getPositions: RequestHandler = async (
  req: Request,
  res: Response
) => {
  Position.findAll()
    .then((data: unknown[] | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Positions retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Positions not retrieved",
        payload: error.message,
      });
    });
};

export const getPositionById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Position.findByPk(id)
    .then((data: unknown | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Position retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Position not retrieved",
        payload: error.message,
      });
    });
};

export const updatePosition: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const { title, description, vacancies, publication_type, cross_division, division, region, tech_stack, demand_curation, exclusivity, id_vacancy, id_project } = req.body;
  Position.update({ title, description, vacancies, publication_type, cross_division, division, region, tech_stack, demand_curation, exclusivity, id_vacancy, id_project }, { where: { id } })
    .then((isUpdated) => {
      return res.status(200).json({
        status: "Success",
        message: "Position updated successfully",
        payload: isUpdated,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Position not updated",
        payload: error.message,
      });
    });
};

export const deletePosition: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Position.destroy({ where: { id } })
    .then((isDeleted) => {
      return res.status(200).json({
        status: "Success",
        message: "Position deleted successfully",
        payload: isDeleted,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Position not deleted",
        payload: error.message,
      });
    });
};
