import { Router } from "express";
import {
    getAllPipelines,
    getPipelineById,
    modifyPipeline,
    deletePipeline,
    createPipeline
    } from "../controller/pipelineController";
const pipelineRouter: Router = Router();

pipelineRouter.get("/", getAllPipelines);
pipelineRouter.get("/:id", getPipelineById);
pipelineRouter.patch("/:id", modifyPipeline);
pipelineRouter.delete("/", deletePipeline);
pipelineRouter.post("/", createPipeline);

export default pipelineRouter;