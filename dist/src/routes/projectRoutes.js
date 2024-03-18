"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controller/projectController");
const projectRouter = (0, express_1.Router)();
projectRouter.get("/", projectController_1.getProjects);
projectRouter.get("/:id", projectController_1.getProjectById);
projectRouter.post("/", projectController_1.createProject);
projectRouter.delete("/", projectController_1.deleteProject);
projectRouter.patch("/:id", projectController_1.updateProject);
// Positions
projectRouter.get("/positions/:id", projectController_1.getJobPositionsByProject);
projectRouter.post("/positions/:id", projectController_1.createPositionByProject);
projectRouter.delete("/positions/:id", projectController_1.deletePositionByProject);
exports.default = projectRouter;
