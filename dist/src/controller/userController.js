"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.modifyUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const user_1 = require("../models/user");
const validator_1 = __importDefault(require("validator"));
//Retrieve all Users from the database.
const getAllUsers = (req, res) => {
    user_1.User.findAll()
        .then((data) => {
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
exports.getAllUsers = getAllUsers;
//Find a single User with an id.
const getUserById = (req, res) => {
    user_1.User.findByPk(req.params.id)
        .then((data) => {
        if (data) {
            return res.status(200).json({
                status: 'success',
                message: 'User retrieved successfully',
                payload: data
            });
        }
        else {
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
exports.getUserById = getUserById;
//Create and Save a new User
const createUser = (req, res) => {
    if (!req.body) {
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
    if (!validator_1.default.isEmail(email)) {
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
    user_1.User.create(user)
        .then((data) => {
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
exports.createUser = createUser;
//Update a User by the id in the request
const modifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }
    //Validations
    const { role } = req.body;
    if (req.body.email && !validator_1.default.isEmail(req.body.email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (role && !['Account Manager', 'Resource Manager', 'Staffer'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role provided' });
    }
    //Make sure the user exists
    user_1.User.findByPk(req.params.id)
        .then((data) => {
        if (data) {
            //Update the user
            user_1.User.update(Object.assign({}, req.body), { where: { id: req.params.id } })
                .then((isUpdated) => {
                if (isUpdated) {
                    return res.status(200).json({
                        status: "success",
                        message: "User updated successfully",
                        payload: Object.assign({}, req.body),
                    });
                }
                else {
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
        }
        else {
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
});
exports.modifyUser = modifyUser;
//Delete a Product with the specified id in the request
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    //Make sure the user exists
    user_1.User.findByPk(id)
        .then((data) => {
        if (data) {
            //Delete the user
            user_1.User.destroy({ where: { id } })
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
        }
        else {
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
});
exports.deleteUser = deleteUser;
