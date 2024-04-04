import { Router } from 'express';
import {
  createPosition,
  getPositions,
  getPositionById,
  updatePosition,
  deletePosition,
  getOpeningsByPosition,
} from '../controller/positionController';
const positionRouter: Router = Router();

//Position Methods
positionRouter.get('/', (getPositions));
positionRouter.get('/:id', (getPositionById)); 
positionRouter.post('/', (createPosition));
positionRouter.patch('/:id', (updatePosition));
positionRouter.delete('/', (deletePosition));

// Opening Methods For Positions
positionRouter.get('/openings/:id', (getOpeningsByPosition));
// positionRouter.get('/opening/:id', (createOpeningForPosition));

export default positionRouter;
