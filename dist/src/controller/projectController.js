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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePositionByProject = exports.createPositionByProject = exports.getJobPositionsByProject = exports.getProjectById = exports.deleteProject = exports.updateProject = exports.getProjects = exports.createProject = void 0;
const projects_1 = require("../models/projects");
const positions_1 = require("../models/positions");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }
    projects_1.Project.create(Object.assign({}, req.body))
        .then((data) => {
        return res.status(201).json({
            status: "Success",
            message: "Project created successfully",
            payload: data,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            status: "Error",
            message: "Project not created",
            payload: error.message,
        });
    });
});
exports.createProject = createProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    projects_1.Project.findAll()
        .then((data) => {
        return res.status(200).json({
            status: "Success",
            message: "Projects retrieved successfully",
            payload: data,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            status: "Error",
            message: "Projects not retrieved",
            payload: error.message,
        });
    });
});
exports.getProjects = getProjects;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }
    const id = req.params.id;
    projects_1.Project.update(Object.assign({}, req.body), { where: { id } })
        .then((isUpdated) => {
        if (isUpdated) {
            return res.status(200).json({
                status: "Success",
                message: "Project updated successfully",
                payload: Object.assign({}, req.body),
            });
        }
        return res.status(500).json({
            status: "Success",
            message: "Something happened updating the product",
            payload: null,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            status: "Error",
            message: `Project not updated: ${error.message}`,
            payload: null,
        });
    });
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        yield projects_1.Project.destroy({ where: { id } });
        return res.status(200).json({ message: "Project deleted" });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error deleting projects.",
            error,
        });
    }
});
exports.deleteProject = deleteProject;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    projects_1.Project.findByPk(id)
        .then((data) => {
        return res.status(200).json({
            status: "Success",
            message: "Project retrieved successfully",
            payload: data,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            status: "Error",
            message: "Project not retrieved",
            payload: error.message,
        });
    });
});
exports.getProjectById = getProjectById;
const getJobPositionsByProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    projects_1.Project.findByPk(id)
        .then((data) => {
        if (data) {
            data.getPositions().then((positions) => {
                return res.status(200).json({
                    status: "Success",
                    message: "Positions retrieved successfully",
                    payload: positions,
                });
            });
        }
        else {
            return res.status(404).json({
                status: "Error",
                message: "Project not found",
                payload: null,
            });
        }
    })
        .catch((error) => {
        return res.status(500).json({
            status: "Error",
            message: "Project not retrieved",
            payload: error.message,
        });
    });
});
exports.getJobPositionsByProject = getJobPositionsByProject;
const createPositionByProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!req.body || !id) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }
    projects_1.Project.findByPk(id)
        .then((data) => {
        if (data) {
            positions_1.Position.create(Object.assign(Object.assign({}, req.body), { id_project: id }))
                .then((data) => {
                return res.status(201).json({
                    status: "Success",
                    message: "Position created successfully",
                    payload: data,
                });
            })
                .catch((error) => {
                return res.status(500).json({
                    status: "Error",
                    message: "Position not created",
                    payload: error.message,
                });
            });
        }
        else {
            return res.status(404).json({
                status: "Error",
                message: "Project not found",
                payload: null,
            });
        }
    })
        .catch((error) => {
        return res.status(500).json({
            status: "Error",
            message: "Project not retrieved",
            payload: error.message,
        });
    });
});
exports.createPositionByProject = createPositionByProject;
const deletePositionByProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const proj_id = req.params.id;
<<<<<<< HEAD
    positions_1.Position.destroy({ where: { id, project: proj_id } })
=======
    positions_1.Position.destroy({ where: { id, id_project: proj_id } })
>>>>>>> 32d082879f0968f51d34d2cab98d0d4d001b665f
        .then(() => {
        return res.status(200).json({ message: "Position deleted" });
    })
        .catch((error) => {
        return res.status(500).json({
            message: "Error deleting position.",
            error,
        });
    });
});
exports.deletePositionByProject = deletePositionByProject;
