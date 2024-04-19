import {RequestHandler,Request,Response} from "express";
import { Role } from '../models/user/roles';

//Retrieve all Roles from the database.
export const getAllRoles: RequestHandler = (req:Request, res:Response) => {
    Role.findAll()
    .then((data: Role[]) => {
        return res.status(200).json({
            status: "success",
            message: "Roles retrieved successfully",
            payload: data,
        });
    })
    .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "There was an error retrieving all roles." + err.message,
            payload: null,
        });
    });
};

//Find a single Role with an id.
export const getRoleById: RequestHandler = (req:Request, res:Response) => {
    Role.findByPk(req.params.id)
    .then((data: Role | null) => {
        if (data) {
            return res.status(200).json({
                status: 'success',
                message: 'Role retrieved successfully',
                payload: data
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'Role not found',
                payload: null
            });
        }
    })
    .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "There was an error retrieving the role." + err.message,
            payload: null,
        });
    });
};

//Create and Save a new Role
export const createRole: RequestHandler = (req:Request, res:Response) => {
    if(!req.body){
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const { role_name, users } = req.body;

    // Validations
    if (!role_name) {
        return res.status(400).json({
            status: 'error',
            message: 'The role name is required',
            payload: null
        });
    }

    // Verify role_name value is valid
    if (!['Admin', 'Account', 'Resource', 'Staffer'].includes(role_name)) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Invalid role name provided',
            payload: null
        });
    }

    // If users is provided check correct formatting
    if(users && !Array.isArray(users)){
        return res.status(400).json({
            status: 'error',
            message: 'Invalid user format',
            payload: null
        })
    }

    Role.create({...req.body})
    .then((data: Role | null) => {
        res.status(200).json({
            status: "success",
            message: "Role created successfully",
            payload: data,
        });
    })
    .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "There was an error creating the role" + err.message,
            payload: null,
        });
    });
};

export const modifyRole: RequestHandler = async (req:Request, res:Response) => {
    if(!req.body){
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    //Validations
    const {role_name, users} = req.body;

    if (role_name && !['Admin', 'Account', 'Resource', 'Staffer'].includes(role_name)) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Invalid role provided',
            payload: null
        });
    }

    if(users && !Array.isArray(users)){
        return res.status(400).json({
            status: 'error',
            message: 'Invalid user format',
            payload: null
        })
    }

    //Make sure the role exists
    Role.findByPk(req.params.id)
    .then((data: Role | null) => {
        if (data) {
            //Update the role
            Role.update({...req.body}, {where: {id: req.params.id} })
            .then((isUpdated) => {
                if(isUpdated){
                    return res.status(200).json({
                        status: "success",
                        message: "Role updated successfully",
                        payload: {...req.body},
                    });
                } else{
                    return res.status(500).json({
                        status: "error",
                        message: "There was an error updating the role",
                        payload: null,
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    status: "error",
                    message: "There was an error updating the role" + err.message,
                    payload: null,
                });
            }); 
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'Role not found',
                payload: null
            });
        }
    })
    .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "There was an error updating the role." + err.message,
            payload: null,
        });
    });
};

//Delete a Role with the specified id in the request
export const deleteRole: RequestHandler = async (req:Request, res:Response) => {
    const {id} = req.body;

    //Make sure the role exists
    Role.findByPk(id)
    .then((data: Role | null) => {
        if (data) {
            //Delete the role
            Role.destroy({where: { id } })
            .then(() => {
                return res.status(200).json({
                    status: "success",
                    message: "Role deleted successfully",
                    payload: null,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: "success",
                    message: "There was an error deleting the role" + err.message,
                    payload: null,
                });
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'Role not found',
                payload: null
            });
        }
    })
    .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "There was an error deleting the role." + err.message,
            payload: null,
        });
    });
};