import { Router } from 'express';
import {
  createOpening,
  getOpenings,
  getOpeningById,
  updateOpening,
  deleteOpening,
} from '../controller/openingController';
const openingRouter: Router = Router();

//Opening Methods
openingRouter.get('/', (getOpenings));
openingRouter.get('/:id', (getOpeningById)); 
openingRouter.post('/', (createOpening));
openingRouter.patch('/:id', (updateOpening));
openingRouter.delete('/', (deleteOpening));

export default openingRouter;
