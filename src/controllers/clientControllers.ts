import { RequestHandler, Request, Response } from 'express';
import { Client } from "../models/client";
import { Category } from "../models/category"

// Create and Save a New Client
export const createClient: RequestHandler = (req: Request, res: Response) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
  }

  // Save Client in the Database
  const client = { ...req.body };
  Client.create(client)
    .then((data: Client | null) => {
      res.status(200).json({
        status: "success",
        message: "Client successfully created",
        payload: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Something happened creating a client. " + err.message,
        payload: null,
      });
    });
};

// Retrieve all Clients from the database.
export const getAllClients: RequestHandler = (req: Request, res: Response) => {
  // Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
  Client.findAll({include: [{
    model: Category,
    attributes: ['name']
  }]})
  .then((data: Client[]) => {
    return res.status(200).json({
      status: "success",
      message: "Clients succesfully retrieved",
      payload: data,
    });
  })
  .catch((err) => {
    return res.status(500).json({
      status: "error",
      message: "Something happened retrieving all clients. " + err.message,
      payload: null,
    });
  });
};

// Find a single Client with an id
export const getClientById: RequestHandler = (req: Request, res: Response) => {
  Client.findByPk(req.params.id)
  .then((data: Client | null) => {
    return res.status(200).json({
      status: "success",
      message: "Clients successfully retrieved",
      payload: data,
    });
  })
  .catch((err) => {
    return res.status(500).json({
      status: "error",
      message: "Something happened retrieving all clients. " + err.message,
      payload: null,
    });
  });
};

// Update a Client bny the id in the request
export const modifyClient: RequestHandler = async (req: Request, res: Response) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
  }

  // Save Client in the database
  Client.update({ ...req.body }, { where: { id: req.params.id }})
  .then((isUpdated) => {
    if (isUpdated) {
      return res.status(200).json({
        status: "success",
        message: "Client succesfully updated",
        payload: { ...req.body},
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Something happened updating the client. ",
        payload: null,      
      });
    }
  })
  .catch((err) => {
    return res.status(500).json({
      status: "error",
      message: "Something happened updating a client. " + err.message,
      payload: null,
    });
  });
};

// Delete a Client with the specified if in the request 
export const deleteClient: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await Client.destroy({ where: { id } });
    return res.status(200).json({ message: "Client deleted" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting clients", error,
    });
  }
};