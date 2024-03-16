import { type RequestHandler, type Request, type Response } from "express";
import { Project } from "../models/projects";

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
