import { Sequelize } from 'sequelize-typescript';
import { Employee, Bench, Billing, Pipeline, Hired } from '../models/employee'; // Importa tus modelos

const connection = new Sequelize({
  database: 'sisweb_db',
  dialect: 'postgres',
  username: 'sisweb_user',
  password: 'HDK#$%Ljkwerff.89',
  storage: ':memory:',
  models: [Employee, Bench, Billing, Pipeline, Hired], // Añade tus modelos aquí
});

async function connectionDB() {
  try {
    await connection.sync({ alter: true }); // Disabled when you're turning into production mode
  } catch (e) {
    console.log(e);
  }
}

export default connectionDB;
