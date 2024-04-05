import { RequestHandler, Request, Response } from "express";
import { Opening } from "../models/position/openings";
import { Employee } from "../models/person/employees";

export const createOpening: RequestHandler = async (
  req: Request,
  res: Response
) => {
  Opening.create(req.body)
    .then((data: unknown) => {
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
      model: Employee,
    },
  })
    .then((data: unknown[] | null) => {
      if (!data || data.length === 0) {
        return res.status(404).json({
          status: "Error",
          message: "No opening found",
          payload: null,
        });
      }

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
  Opening.findByPk(id, {
    include: {
      model: Employee,
    },
  })
    .then((data: unknown | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Opening retrieved successfully",
        payload: data,
      });
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
  Opening.update(req.body, { where: { id } })
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
};

export const deleteOpening: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.body.id;
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
};
