import { RequestHandler, Request, Response } from "express";
import { ClientPersonRelation } from "../models/client/client_person_relations";
import { Client } from "../models/client/clients";
import { Person } from "../models/person/people";

//Get all Client Person Relations
export const getAllClientPersonRelations: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    ClientPersonRelation.findAll({})
      .then((data: ClientPersonRelation[] | null) => {
        return res.status(200).json({
          status: "Success",
          message: "Client and Person Relations retrieved successfully",
          payload: data,
        });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          status: "Error",
          message: "Client and Person Relations not retrieved",
          payload: error.message,
        });
      });
};

//Find a single Client Person Relation with COMPOSITE pk
export const getClientPersonRelationById: RequestHandler = (req:Request, res:Response) => {

    const {person_id, client_id } = req.params;

    //Validations
  if (
    !person_id||
    !client_id
  ) {
    return res.status(400).json({
      status: "error",
      message: "Required information missing",
      payload: null,
    });
  }

    Client.findByPk(client_id)
    .then((client: Client | null) => {
        if(!client){
            return res.status(404).json({
                status: "Error",
                message: "Client not found",
                payload: null,
            });
        } else{
            Person.findByPk(person_id)
            .then((person: Person | null) => {
                if(!person){
                    return res.status(404).json({
                        status: "Error",
                        message: "Person not found",
                        payload: null,
                    });
                } else{
                    ClientPersonRelation.findOne({where: {person_id, client_id}})
                    .then((data: ClientPersonRelation | null) => {
                        if (data) {
                            return res.status(200).json({
                                status: 'success',
                                message: 'Client and Person Relation retrieved successfully',
                                payload: data
                            });
                        } else {
                            return res.status(404).json({
                                status: 'error',
                                message: 'Client and Person Relation not found',
                                payload: null
                            });
                        }
                    })
                    .catch((err:Error) => {
                        return res.status(500).json({
                            status: "error",
                            message: "There was an error retrieving the Client and Person Relation." + err.message,
                            payload: null,
                        });
                    });
                }
            })
            .catch((err:Error) => {
                return res.status(500).json({
                    status: "error",
                    message: "There was an error retrieving the Client and Person Relation." + err.message,
                    payload: null,
                });
            });
        }
    })
    .catch((err:Error) => {
        return res.status(500).json({
            status: "error",
            message: "There was an error retrieving the Client and Person Relation." + err.message,
            payload: null,
        });
    });
};