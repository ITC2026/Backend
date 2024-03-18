import { RequestHandler, Request, Response } from "express";
import { Position } from "../models/positions"; // Import the Position model

export const createPosition: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { title_position, description_position, vacancies_position, publication_type_position, cross_division_position, division_position, region_position, tech_stack_position, demand_curation_position, is_exclusive_position, vacancy_id_position, project } = req.body;
  Position.create(req.body)
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
  const { title_position, description_position, vacancies_position, publication_type_position, cross_division_position, division_position, region_position, tech_stack_position, demand_curation_position, is_exclusive_position, vacancy_id_position, project } = req.body;
  Position.update( req.body, { where: { id } })
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
