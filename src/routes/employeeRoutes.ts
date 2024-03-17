import express from 'express';
import * as employeesController from './src/controllers/employeesController'; // Importa tus controladores

const router = express.Router();

router.get('/employees', employeesController.getAllEmployees);
router.get('/employees/:id', employeesController.getEmployeeById);
router.post('/employees', employeesController.createEmployee);
router.patch('/employees/:id', employeesController.updateEmployee);
router.delete('/employees/:id', employeesController.deleteEmployee);

export default router;
