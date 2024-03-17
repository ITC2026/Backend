import { type RequestHandler, type Request, type Response } from "express";
import { Project } from "../models/projects";


export const createProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { name, description, company } = req.body;
  Project.create({ name, description, company })
    .then((data: Project) => {
      return res.status(201).json({
        status: "Success",
        message: "Project created successfully",
        payload: data,
      });
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
  Project.findAll()
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

export const getProjectById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Project.findByPk(id)
    .then((data: Project | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Project retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Project not retrieved",
        payload: error.message,
      });
    });
};

export const updateProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const { name, description, company } = req.body;
  Project.update({ name, description, company }, { where: { id } })
    .then((isUpdated) => {
      return res.status(200).json({
        status: "Success",
        message: "Project updated successfully",
        payload: isUpdated, // ??? Check if isUpdated is a boolean
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Project not updated",
        payload: error.message,
      });
    });
};

export const deleteProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Project.destroy({ where: { id } })
    .then((isDeleted) => {
      return res.status(200).json({
        status: "Success",
        message: "Project deleted successfully",
        payload: isDeleted, // ??? Check if isDeleted is a boolean
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Project not deleted",
        payload: error.message,
      });
    });
};
