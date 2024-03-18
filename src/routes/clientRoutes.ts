import { Router, Request, Response } from 'express';
import { createClient, deleteClient, getAllClients, getClientById, modifyClient } from '../controller/clientController';

const clientRouter: Router = Router();

clientRouter.get('/', getAllClients);

clientRouter.get('/:id', getClientById);

clientRouter.post('/', createClient);

clientRouter.delete('/', deleteClient);

clientRouter.patch('/:id', modifyClient);

export default clientRouter;