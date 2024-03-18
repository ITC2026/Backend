"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const projectRoutes_1 = __importDefault(require("./projectRoutes"));
const positionRoutes_1 = __importDefault(require("./positionRoutes"));
const apiRouter = (0, express_1.Router)();
apiRouter.use("/user", userRoutes_1.default);
apiRouter.use("/projects", projectRoutes_1.default);
apiRouter.use("/positions", positionRoutes_1.default);
apiRouter.get("/", (req, res) => {
    res.send("Hello TypeScript 4!");
});
exports.default = apiRouter;
