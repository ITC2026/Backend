import { RequestHandler, Request, Response } from "express";
import { Pipeline } from "../models/person/pipeline";

export const getAllPipelines: RequestHandler = (
  req: Request,
  res: Response
) => {
  Pipeline.findAll()
    .then((data: Pipeline[]) => {
      return res.status(200).json({
        status: "Success",
        message: "Pipelines retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Pipelines not retrieved",
        payload: error.message,
      });
    });
};

export const getPipelineById: RequestHandler = (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  Pipeline.findByPk(id)
    .then((data: Pipeline | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Pipeline retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Pipeline not retrieved",
        payload: error.message,
      });
    });
};

export const modifyPipeline: RequestHandler = (req: Request, res: Response) => {
  const id = req.params.id;
  Pipeline.update(req.body, { where: { id } })
    .then((isUpdated) => {
      if (isUpdated) {
        return res.status(200).json({
          status: "Success",
          message: "Pipeline updated successfully",
          payload: req.body,
        });
      }
      return res.status(500).json({
        status: "Error",
        message: "Pipeline not updated",
        payload: null,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Pipeline not updated",
        payload: error.message,
      });
    });
};

export const deletePipeline: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Please provide an id to delete the pipeline",
      payload: null,
    });
  }

  Pipeline.findByPk(req.body.id).then((data: Pipeline | null) => {
    if (data) {
      Pipeline.destroy({ where: { id: req.body.id } }).then((isDeleted) => {
        if (isDeleted) {
          return res.status(200).json({
            status: "success",
            message: "Pipeline deleted successfully",
            payload: null,
          });
        } else {
          return res.status(500).json({
            status: "error",
            message: "There was an error deleting the pipeline",
            payload: null,
          });
        }
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Pipeline not found",
        payload: null,
      });
    }
  });
};

export const createPipeline: RequestHandler = (req: Request, res: Response) => {
  Pipeline.create({ ...req.body })
    .then((data: Pipeline) => {
      return res.status(200).json({
        status: "Success",
        message: "Pipeline created successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Pipeline not created",
        payload: error.message,
      });
    });
};
