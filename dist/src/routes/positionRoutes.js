"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const positionController_1 = require("../controller/positionController");
const positionRouter = (0, express_1.Router)();
//Position Methods
positionRouter.get('/', (positionController_1.getPositions));
positionRouter.get('/:id', (positionController_1.getPositionById));
positionRouter.post('/', (positionController_1.createPosition));
positionRouter.patch('/:id', (positionController_1.updatePosition));
positionRouter.delete('/', (positionController_1.deletePosition));
exports.default = positionRouter;
