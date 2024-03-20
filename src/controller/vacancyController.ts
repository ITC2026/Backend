import { RequestHandler, Request, Response } from "express";
import { Vacancy } from "../models/vacancies";
import { Employee } from "../models/employee/employee";

export const createVacancy: RequestHandler = async (
  req: Request,
  res: Response
) => {
  Vacancy.create(req.body,
    {
      include: { 
        model: Employee,
      }
    })
    .then((data: unknown) => {
      return res.status(201).json({
        status: "Success",
        message: "Vacancy created successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Vacancy not created",
        payload: error.message,
      });
    });
};

export const getVacancies: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    Vacancy.findAll({ 
      include: { 
        model: Employee,
      }
    })
      .then((data: unknown[] | null) => {
        if (!data || data.length === 0) {
          return res.status(404).json({
            status: "Error",
            message: "No vacancies found",
            payload: null,
          });
        }
  
        return res.status(200).json({
          status: "Success",
          message: "Vacancies retrieved successfully",
          payload: data,
        });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          status: "Error",
          message: "Vacancies not retrieved",
          payload: error.message,
        });
      });
};

export const getVacancyById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Vacancy.findByPk(id,
    {
      include: { 
        model: Employee,
      }
    })
    .then((data: unknown | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Vacancy retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Vacancy not retrieved",
        payload: error.message,
      });
    });
};

export const updateVacancy: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Vacancy.update( req.body, { where: { id } })
    .then((isUpdated) => {
      return res.status(200).json({
        status: "Success",
        message: "Vacancy updated successfully",
        payload: isUpdated,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Vacancy not updated",
        payload: error.message,
      });
    });
};

export const deleteVacancy: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.body.id;
  Vacancy.destroy({ where: { id } })
    .then((isDeleted) => {
      return res.status(200).json({
        status: "Success",
        message: "Vacancy deleted successfully",
        payload: isDeleted,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Vacancy not deleted",
        payload: error.message,
      });
    });
};

