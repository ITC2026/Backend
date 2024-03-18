import { Router, Request, Response } from 'express';
import {
  createPosition,
  getPositions,
  getPositionById,
  updatePosition,
  deletePosition,
} from '../controller/positionController';
const positionRouter: Router = Router();

//Position Methods
positionRouter.get('/', (getPositions));
positionRouter.get('/:id', (getPositionById)); 
positionRouter.post('/', (createPosition));
positionRouter.patch('/:id', (updatePosition));
positionRouter.delete('/', (deletePosition));

export default positionRouter;
