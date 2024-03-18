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
exports.deleteProduct = exports.modifyProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_1 = require("../models/product");
const category_1 = require("../models/category");
// Create and Save a New Product
const createProduct = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }
    // Save Product in the Database
    const product = Object.assign({}, req.body);
    product_1.Product.create(product)
        .then((data) => {
        res.status(200).json({
            status: "success",
            message: "Product successfully created",
            payload: data,
        });
    })
        .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "Something happened creating a product. " + err.message,
            payload: null,
        });
    });
};
exports.createProduct = createProduct;
// Retrieve all Products from the database.
const getAllProducts = (req, res) => {
    // Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
    product_1.Product.findAll({ include: [{
                model: category_1.Category,
                attributes: ['name']
            }] })
        .then((data) => {
        return res.status(200).json({
            status: "success",
            message: "Products succesfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened retrieving all products. " + err.message,
            payload: null,
        });
    });
};
exports.getAllProducts = getAllProducts;
// Find a single Product with an id
const getProductById = (req, res) => {
    product_1.Product.findByPk(req.params.id)
        .then((data) => {
        return res.status(200).json({
            status: "success",
            message: "Products successfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened retrieving all products. " + err.message,
            payload: null,
        });
    });
};
exports.getProductById = getProductById;
// Update a Product bny the id in the request
const modifyProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }
    // Save Product in the database
    product_1.Product.update(Object.assign({}, req.body), { where: { id: req.params.id } })
        .then((isUpdated) => {
        if (isUpdated) {
            return res.status(200).json({
                status: "success",
                message: "Product succesfully updated",
                payload: Object.assign({}, req.body),
            });
        }
        else {
            return res.status(500).json({
                status: "error",
                message: "Something happened updating the product. ",
                payload: null,
            });
        }
    })
        .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened updating a product. " + err.message,
            payload: null,
        });
    });
});
exports.modifyProduct = modifyProduct;
// Delete a Product with the specified if in the request 
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        yield product_1.Product.destroy({ where: { id } });
        return res.status(200).json({ message: "Product deleted" });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error deleting products", error,
        });
    }
});
exports.deleteProduct = deleteProduct;
