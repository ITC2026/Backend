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
exports.getProjectsByClient = exports.deleteClient = exports.modifyClient = exports.createClient = exports.getClientById = exports.getAllClients = void 0;
const clients_1 = require("../models/clients");
const validator_1 = __importDefault(require("validator"));
// Retrieve all Clients from the database.
const getAllClients = (req, res) => {
    clients_1.Client.findAll()
        .then((data) => {
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
exports.getAllClients = getAllClients;
// Find a single Client with an id
const getClientById = (req, res) => {
    clients_1.Client.findByPk(req.params.id)
        .then((data) => {
        if (data) {
            return res.status(200).json({
                status: 'success',
                message: 'Client retrieved successfully',
                payload: data
            });
        }
        else {
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
exports.getClientById = getClientById;
// Create and Save a New Client
const createClient = (req, res) => {
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
    if (!validator_1.default.isURL(contract_pdf_url)) {
        return res.status(400).json({ message: 'Invalid URL format for contract' });
    }
    if (!validator_1.default.isURL(logo_url)) {
        return res.status(400).json({ message: 'Invalid URL format for logo' });
    }
    // Save Client in the Database
    const client = Object.assign({}, req.body);
    clients_1.Client.create(client)
        .then((data) => {
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
exports.createClient = createClient;
// Update a Client bny the id in the request
const modifyClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (!validator_1.default.isURL(contract_pdf_url)) {
        return res.status(400).json({ message: 'Invalid URL format for contract' });
    }
    if (!validator_1.default.isURL(logo_url)) {
        return res.status(400).json({ message: 'Invalid URL format for logo' });
    }
    // Save Client in the database
    clients_1.Client.findByPk(req.params.id)
        .then((data) => {
        if (data) {
            // Update the client
            clients_1.Client.update(Object.assign({}, req.body), { where: { id: req.params.id } })
                .then((isUpdated) => {
                if (isUpdated) {
                    return res.status(200).json({
                        status: "success",
                        message: "Client updated successfully",
                        payload: Object.assign({}, req.body),
                    });
                }
                else {
                    return res.status(500).json({
                        status: "error",
                        message: "There was an error updating the client",
                        payload: null,
                    });
                }
            });
        }
        else {
            return res.status(404).json({
                status: 'error',
                message: 'Client not found',
                payload: null
            });
        }
    });
});
exports.modifyClient = modifyClient;
// Delete a Client with the specified if in the request 
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    clients_1.Client.findByPk(req.body.id)
        .then((data) => {
        if (data) {
            // Delete the client
            clients_1.Client.destroy({ where: { id: req.body.id } })
                .then((isDeleted) => {
                if (isDeleted) {
                    return res.status(200).json({
                        status: "success",
                        message: "Client deleted successfully",
                        payload: null,
                    });
                }
                else {
                    return res.status(500).json({
                        status: "error",
                        message: "There was an error deleting the client",
                        payload: null,
                    });
                }
            });
        }
        else {
            return res.status(404).json({
                status: 'error',
                message: 'Client not found',
                payload: null
            });
        }
    });
});
exports.deleteClient = deleteClient;
// Find all projects of specific client
const getProjectsByClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "Client ID is required",
            payload: null,
        });
    }
    clients_1.Client.findByPk(req.params.id)
        .then((data) => {
        if (data) {
            data.getProjects()
                .then((projects) => {
                return res.status(200).json({
                    status: 'success',
                    message: 'Projects retrieved successfully',
                    payload: projects
                });
            });
        }
        else {
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
});
exports.getProjectsByClient = getProjectsByClient;
