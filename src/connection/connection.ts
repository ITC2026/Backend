import { Sequelize } from 'sequelize-typescript';
import { Employee } from '../models/employee/employee';
import { Bench } from '../models/employee/bench';
import { Billing } from '../models/employee/billing';
import { Pipeline } from '../models/employee/pipeline';
import { Hired } from '../models/employee/hired_employee';

const connection = new Sequelize({
  database: 'employeeDB',
  dialect: 'postgres',
  username: 'sisweb_user',
  password: 'HDK#$%Ljkwerff.89',
  storage: ':memory:',
  schema: 'public',
  models: [Employee, Bench, Billing, Pipeline, Hired], 
});

async function connectionDB() {
  try {
    await connection.sync(); // Enable it only when you're turning into development mode
  } catch (e) {
    console.log(e);
  }
}

export default connectionDB;
