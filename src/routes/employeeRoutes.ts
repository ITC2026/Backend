import express from 'express';
import { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, getEmployeePipelineById, getEmployeeBenchById, getEmployeeBillingById } from '../controller/employeesController';

const router = express.Router();

router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/', createEmployee);
router.patch('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/pipeline/:id', getEmployeePipelineById);
router.get('/bench/:id', getEmployeeBenchById);
router.get('/billing/:id', getEmployeeBillingById);

export default router;

