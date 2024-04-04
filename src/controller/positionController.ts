import { RequestHandler, Request, Response } from "express";
import { Position } from "../models/position/positions";
import { Opening } from "../models/position/openings";

export const createPosition: RequestHandler = async (
  req: Request,
  res: Response
) => {
  Position.create({ ...req.body })
    .then((data: unknown) => {
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
    include: { 
      model: Opening
    }
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
      include: { 
        model: Opening
      }
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
  Position.update({ ...req.body }, { where: { id } })
    .then((isUpdated) => {
      if (isUpdated) {
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
};

export const deletePosition: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.body.id;
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
};

export const getOpeningsByPosition: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Position.findByPk(id)
    .then((data: Position | null) => {
      if (data) {
        data.getOpenings().then((vacancies: Opening[]) => {
          return res.status(200).json({
            status: "Success",
            message: "Vacancies retrieved successfully",
            payload: vacancies,
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
        message: "Job Position not retrieved",
        payload: error.message,
      });
    });
};
