import express from 'express';
import { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, getEmployeePipelineById, getEmployeeBenchById, getEmployeeBillingById } from '../controllers/employeesController';

const router = express.Router();

router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployeeById);
router.post('/employees', createEmployee);
router.patch('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);
router.get('/employees/pipeline/:id', getEmployeePipelineById);
router.get('/employees/bench/:id', getEmployeeBenchById);
router.get('/employees/billing/:id', getEmployeeBillingById);

export default router;

