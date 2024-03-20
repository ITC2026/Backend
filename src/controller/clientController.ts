import { RequestHandler, Request, Response } from 'express';
import { Client } from "../models/clients";
import validator from 'validator';
import { Project } from '../models/projects';

// Retrieve all Clients from the database.
export const getAllClients: RequestHandler = (req: Request, res: Response) => {
  Client.findAll({ 
    include: { 
      model: Project,
    }
  })
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
  Client.findByPk(req.params.id, { 
    include:{ 
      model: Project,
    }
  })
    .then((data: Client | null) => {
      if (data) {
        return res.status(200).json({
            status: 'success',
            message: 'Client retrieved successfully',
            payload: data
        });
      } else {
        return res.status(404).json({
            status: 'error',
            message: 'Client not found',
            payload: null
        });
      }
  })
  .catch((err) => {
      return res.status(500).json({
          status: "error",
          message: "There was an error finding the Client." + err.message,
          payload: null,
      });
  });
};

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

  const { contract_pdf_url, logo_url, client_name, client_desc, exclusivity, high_growth, division } = req.body;

  //Validations
  if (!contract_pdf_url || !logo_url || !client_name || !client_desc || !exclusivity || !high_growth || !division) {
    return res.status(400).json({
        status: 'error',
        message: 'All fields are required',
        payload: null
    });
  }

  if (!validator.isURL(contract_pdf_url)) {
    return res.status(400).json({ message: 'Invalid URL format for contract' });
  }

  if (!validator.isURL(logo_url)) {
    return res.status(400).json({ message: 'Invalid URL format for logo' });
  }

  // Save Client in the Database
  Client.create({ ...req.body })
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

  const { contract_pdf_url, logo_url, client_name, client_desc, exclusivity, high_growth, division } = req.body;

  //Validations

  if (!contract_pdf_url || !logo_url || !client_name || !client_desc || !exclusivity || !high_growth || !division) {
    return res.status(400).json({
        status: 'error',
        message: 'All fields are required',
        payload: null
    });
  }

  if (!validator.isURL(contract_pdf_url)) {
    return res.status(400).json({ message: 'Invalid URL format for contract' });
  }

  if (!validator.isURL(logo_url)) {
    return res.status(400).json({ message: 'Invalid URL format for logo' });
  }

  // Save Client in the database
  Client.findByPk(req.params.id)
  .then((data: Client | null) => {
    if (data) {
      // Update the client
      Client.update({...req.body}, {where: {id: req.params.id} })
      .then((isUpdated) => {
        if(isUpdated){
          return res.status(200).json({
            status: "success",
            message: "Client updated successfully",
            payload: {...req.body},
          });
        } else{
          return res.status(500).json({
            status: "error",
            message: "There was an error updating the client",
            payload: null,
          });
        }
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found',
        payload: null
      });
    }
  });
};

// Delete a Client with the specified if in the request 
export const deleteClient: RequestHandler = async (req: Request, res: Response) => {
  Client.findByPk(req.body.id)
  .then((data: Client | null) => {
    if (data) {
      // Delete the client
      Client.destroy({where: {id: req.body.id} })
      .then((isDeleted) => {
        if(isDeleted){
          return res.status(200).json({
            status: "success",
            message: "Client deleted successfully",
            payload: null,
          });
        } else{
          return res.status(500).json({
            status: "error",
            message: "There was an error deleting the client",
            payload: null,
          });
        }
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found',
        payload: null
      });
    }
  });
};

// Find all projects of specific client

export const getProjectsByClient: RequestHandler = async (req: Request, res: Response) => {

  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Client ID is required",
      payload: null,
    });
  } 


  Client.findByPk(req.params.id)
    .then((data: Client | null) => {
      if (data) {
        data.getProjects()
        .then((projects) => {
          return res.status(200).json({
            status: 'success',
            message: 'Projects retrieved successfully',
            payload: projects
          });
        });
      } else {
        return res.status(404).json({
            status: 'error',
            message: 'Client not found',
            payload: null
        });
      }
  })
  .catch((err) => {
      return res.status(500).json({
          status: "error",
          message: "There was an error finding the Client." + err.message,
          payload: null,
      });
  });
};