import { Router } from 'express';
import {
  createVacancy,
  getVacancies,
  getVacancyById,
  updateVacancy,
  deleteVacancy,
} from '../controller/vacancyController';
const vacancyRouter: Router = Router();

//Vacancy Methods
vacancyRouter.get('/', (getVacancies));
vacancyRouter.get('/:id', (getVacancyById)); 
vacancyRouter.post('/', (createVacancy));
vacancyRouter.patch('/:id', (updateVacancy));
vacancyRouter.delete('/', (deleteVacancy));

export default vacancyRouter;
