"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
<<<<<<< HEAD
const positionController_1 = require("../controller/positionController");
const positionRouter = (0, express_1.Router)();
//Position Methods
positionRouter.get('/', (positionController_1.getPositions));
positionRouter.get('/:id', (positionController_1.getPositionById));
positionRouter.post('/', (positionController_1.createPosition));
positionRouter.patch('/:id', (positionController_1.updatePosition));
positionRouter.delete('/', (positionController_1.deletePosition));
=======
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
>>>>>>> 32d082879f0968f51d34d2cab98d0d4d001b665f
exports.default = positionRouter;
