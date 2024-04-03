import { RequestHandler, Request, Response } from "express";
import { TicketLog } from "../models/ticketLog/ticket_log";
import { Entity } from "../models/ticketLog/entities"; // Adjust the path if needed

export const createTicketLog: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  TicketLog.create({ ...req.body })
    .then((data: TicketLog) => {
      return res.status(201).json({
        status: "Success",
        message: "Ticket log created successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Ticket log not created",
        payload: error.message,
      });
    });
};

export const getTicketLogs: RequestHandler = async (
  req: Request,
  res: Response
) => {
  TicketLog.findAll({
    include: { 
      model: Entity,
    }
  })
    .then((data: TicketLog[] | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Ticket logs retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Ticket logs not retrieved",
        payload: error.message,
      });
    });
};

export const modifyTicketLog: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
  }

  const id = req.params.id;
  TicketLog.update({ ...req.body }, { where: { id } })
    .then((isUpdated) => {
      if (isUpdated) {
        return res.status(200).json({
          status: "Success",
          message: "Ticket log updated successfully",
          payload: { ...req.body },
        });
      }
      return res.status(500).json({
        status: "Success",
        message: "Something happened updating the ticket log",
        payload: null,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: `Ticket log not updated: ${error.message}`,
        payload: null,
      });
    });
};

export const deleteTicketLog: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;
  TicketLog.destroy({ where: { id } })
    .then((isDeleted) => {
      if (isDeleted) {
        return res.status(200).json({
          status: "Success",
          message: "Ticket log deleted successfully",
          payload: { ...req.body },
        });
      }
      return res.status(500).json({
        status: "Error",
        message: "Ticket log not deleted",
        payload: null,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Error deleting ticket log",
        payload: error.message,
      });
    });
};

export const getTicketLogById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  TicketLog.findByPk(id,
    {
      include: { 
        model: Entity,
      }
    })
    .then((data: TicketLog | null) => {
      return res.status(200).json({
        status: "Success",
        message: "Ticket log retrieved successfully",
        payload: data,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        status: "Error",
        message: "Ticket log not retrieved",
        payload: error.message,
      });
    });
};
