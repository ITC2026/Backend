import { Router } from "express";
import {
    getAllCandidates,
    getCandidateById,
    modifyCandidate,
    deleteCandidate,
    createCandidate
    } from "../controller/candidateController";
const candidateRouter: Router = Router();

candidateRouter.get("/", getAllCandidates);
candidateRouter.get("/:id", getCandidateById);
candidateRouter.patch("/:id", modifyCandidate);
candidateRouter.delete("/", deleteCandidate);
candidateRouter.post("/",     createCandidate
);

export default candidateRouter;