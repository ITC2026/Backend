import { RequestHandler, Request, Response } from "express";
import { Candidate } from "../models/person/candidates";

export const getAllCandidates: RequestHandler = (
  req: Request,
  res: Response
) => {
  Candidate.findAll()
    .then((data: Candidate[]) => {
      return res.status(200).json({
        status: "Success",
        message: "Candidates retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Candidates not retrieved",
        payload: error.message,
      });
    });
};

export const getCandidateById: RequestHandler = (
  req: Request,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(400).json({
      status: "error",
      message: "Please provide an id to retrieve the candidate",
      payload: null,
    });
  }
  const id = req.params.id;
  Candidate.findByPk(id)
    .then((data: Candidate | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Candidate retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Candidate not retrieved",
        payload: error.message,
      });
    });
};

export const modifyCandidate: RequestHandler = (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({
      status: "error",
      message: "Please provide an id to update the candidate",
      payload: null,
    });
  }

  const id = req.params.id;
  Candidate.update(req.body, { where: { id } })
    .then((isUpdated) => {
      if (isUpdated) {
        return res.status(200).json({
          status: "Success",
          message: "Candidate updated successfully",
          payload: req.body,
        });
      }
      return res.status(500).json({
        status: "Error",
        message: "Candidate not updated",
        payload: null,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Candidate not updated",
        payload: error.message,
      });
    });
};

export const deleteCandidate: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Please provide an id to delete the candidate",
      payload: null,
    });
  }

  Candidate.findByPk(req.body.id).then((data: Candidate | null) => {
    if (data) {
      Candidate.destroy({ where: { id: req.body.id } }).then((isDeleted) => {
        if (isDeleted) {
          return res.status(200).json({
            status: "success",
            message: "Candidate deleted successfully",
            payload: null,
          });
        } else {
          return res.status(500).json({
            status: "error",
            message: "There was an error deleting the candidate",
            payload: null,
          });
        }
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Candidate not found",
        payload: null,
      });
    }
  });
};

export const createCandidate: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a candidate",
      payload: null,
    });
  }

  if (!req.body.expected_salary) {
    return res.status(400).json({
      status: "error",
      message: "Please provide an expected salary",
      payload: null,
    });
  }

  Candidate.create({ ...req.body })
    .then((data: Candidate) => {
      return res.status(200).json({
        status: "Success",
        message: "Candidate created successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Candidate not created",
        payload: error.message,
      });
    });
};
