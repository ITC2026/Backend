"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const positionRouter = (0, express_1.Router)();
positionRouter.get('/', (req, res) => {
    res.send('Get a list of positions');
});
positionRouter.get('/:id', (req, res) => {
    res.send(`Get the position ${req.params.id}`);
});
positionRouter.get('/', (req, res) => {
    res.send(`Create a new position with ID: ${req.body.id}`);
});
positionRouter.patch('/:id', (req, res) => {
    res.send(`Update position with ${req.params.id} with the values of ${req.body.title} and  ${req.body.description}`);
});
positionRouter.delete('/', (req, res) => {
    res.send(`Deleted position ${req.body.id}`);
});
exports.default = positionRouter;
