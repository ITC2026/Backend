import {RequestHandler,Request,Response} from "express";
import { User } from "../models/user"
import validator from 'validator';

//Retrieve all Users from the database.
export const getAllUsers: RequestHandler = (req:Request, res:Response) => {
    User.findAll()
    .then((data: User[]) => {
        return res.status(200).json({
            status: "success",
            message: "Users retrieved successfully",
            payload: data,
        });
    })
    .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "There was an error retrieving all users." + err.message,
            payload: null,
        });
    });
};

//Find a single User with an id.
export const getUserById: RequestHandler = (req:Request, res:Response) => {
    User.findByPk(req.params.id)
    .then((data: User | null) => {
        if (data) {
            return res.status(200).json({
                status: 'success',
                message: 'User retrieved successfully',
                payload: data
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
                payload: null
            });
        }
    })
    .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "There was an error retrieving the user." + err.message,
            payload: null,
        });
    });
};
    
//Create and Save a new User
export const createUser: RequestHandler = (req:Request, res:Response) => {
    if(!req.body){
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const { username, password, email, role } = req.body;

    //Validations
    if (!username || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Username and password are required',
            payload: null
        });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Verificar si el valor de role es válido
    if (!['Account Manager', 'Resource Manager', 'Staffer'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role provided' });
    }

    const user = {
        username: username,
        password: password,
        email: email,
        role: role
    };

    User.create(user)
    .then((data: User | null) => {
        res.status(200).json({
            status: "success",
            message: "User created successfully",
            payload: data,
        });
    })
    .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "There was an error creating the user" + err.message,
            payload: null,
        });
    });
};

//Update a User by the id in the request
export const modifyUser: RequestHandler = async (req:Request, res:Response) => {
    if(!req.body){
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    //Validations
    const {role} = req.body;
    if (req.body.email && !validator.isEmail(req.body.email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (role && !['Account Manager', 'Resource Manager', 'Staffer'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role provided' });
    }

    //Make sure the user exists
    User.findByPk(req.params.id)
    .then((data: User | null) => {
        if (data) {
            //Update the user
            User.update({...req.body}, {where: {id: req.params.id} })
            .then((isUpdated) => {
                if(isUpdated){
                    return res.status(200).json({
                        status: "success",
                        message: "User updated successfully",
                        payload: {...req.body},
                    });
                } else{
                    return res.status(500).json({
                        status: "error",
                        message: "There was an error updating the user",
                        payload: null,
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    status: "error",
                    message: "There was an error updating the user" + err.message,
                    payload: null,
                });
            }); 
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
                payload: null
            });
        }
    })
    .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "There was an error updating the user." + err.message,
            payload: null,
        });
    });
};

//Delete a Product with the specified id in the request
export const deleteUser: RequestHandler = async (req:Request, res:Response) => {
    const {id} = req.body;

    //Make sure the user exists
    User.findByPk(id)
    .then((data: User | null) => {
        if (data) {
            //Delete the user
            User.destroy({where: { id } })
            .then(() => {
                return res.status(200).json({
                    status: "success",
                    message: "User deleted successfully",
                    payload: null,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: "success",
                    message: "There was an error deleting the user" + err.message,
                    payload: null,
                });
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
                payload: null
            });
        }
    })
    .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "There was an error deleting the user." + err.message,
            payload: null,
        });
    });
};