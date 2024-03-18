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
exports.deletePosition = exports.updatePosition = exports.getPositionById = exports.getPositions = exports.createPosition = void 0;
<<<<<<< HEAD
const positions_1 = require("../models/positions");
const createPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title_position, description_position, vacancies_position, publication_type_position, cross_division_position, division_position, region_position, tech_stack_position, demand_curation_position, is_exclusive_position, vacancy_id_position, project } = req.body;
    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }
    positions_1.Position.create(req.body)
        .then((data) => {
        return res.status(200).json({
=======
const positions_1 = require("../models/positions"); // Import the Position model
const createPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, vacancies, publication_type, cross_division, division, region, tech_stack, demand_curation, exclusivity, id_vacancy, id_project } = req.body;
    positions_1.Position.create({ title, description, vacancies, publication_type, cross_division, division, region, tech_stack, demand_curation, exclusivity, id_vacancy, id_project })
        .then((data) => {
        return res.status(201).json({
>>>>>>> 32d082879f0968f51d34d2cab98d0d4d001b665f
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
});
exports.createPosition = createPosition;
const getPositions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    positions_1.Position.findAll()
        .then((data) => {
        return res.status(200).json({
            status: "Success",
            message: "Positions retrieved successfully",
            payload: data,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            status: "Error",
            message: "Positions not retrieved",
            payload: error.message,
        });
    });
});
exports.getPositions = getPositions;
const getPositionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    positions_1.Position.findByPk(id)
        .then((data) => {
        return res.status(200).json({
            status: "Success",
            message: "Position retrieved successfully",
            payload: data,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            status: "Error",
<<<<<<< HEAD
            message: "Position was not found",
=======
            message: "Position not retrieved",
>>>>>>> 32d082879f0968f51d34d2cab98d0d4d001b665f
            payload: error.message,
        });
    });
});
exports.getPositionById = getPositionById;
const updatePosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
<<<<<<< HEAD
    const { title_position, description_position, vacancies_position, publication_type_position, cross_division_position, division_position, region_position, tech_stack_position, demand_curation_position, is_exclusive_position, vacancy_id_position, project } = req.body;
    positions_1.Position.update(req.body, { where: { id } })
=======
    const { title, description, vacancies, publication_type, cross_division, division, region, tech_stack, demand_curation, exclusivity, id_vacancy, id_project } = req.body;
    positions_1.Position.update({ title, description, vacancies, publication_type, cross_division, division, region, tech_stack, demand_curation, exclusivity, id_vacancy, id_project }, { where: { id } })
>>>>>>> 32d082879f0968f51d34d2cab98d0d4d001b665f
        .then((isUpdated) => {
        return res.status(200).json({
            status: "Success",
            message: "Position updated successfully",
            payload: isUpdated,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            status: "Error",
            message: "Position not updated",
            payload: error.message,
        });
    });
});
exports.updatePosition = updatePosition;
const deletePosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    positions_1.Position.destroy({ where: { id } })
        .then((isDeleted) => {
        return res.status(200).json({
            status: "Success",
            message: "Position deleted successfully",
            payload: isDeleted,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            status: "Error",
            message: "Position not deleted",
            payload: error.message,
        });
    });
});
exports.deletePosition = deletePosition;
