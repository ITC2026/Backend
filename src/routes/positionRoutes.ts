import { Router, Request, Response } from 'express';
import {
  createPosition,
  getPositions,
  getPositionById,
  updatePosition,
  deletePosition,
  getVacanciesByPosition,
} from '../controller/positionController';
const positionRouter: Router = Router();

//Position Methods
positionRouter.get('/', (getPositions));
positionRouter.get('/:id', (getPositionById)); 
positionRouter.post('/', (createPosition));
positionRouter.patch('/:id', (updatePosition));
positionRouter.delete('/', (deletePosition));

// Vacancy Methods For Positions
positionRouter.get('/vacancies/:id', (getVacanciesByPosition));
// positionRouter.get('/vacancies/:id', (createVacancyForPosition));

export default positionRouter;
