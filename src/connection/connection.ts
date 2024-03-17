import { Sequelize } from "sequelize-typescript"
import { Product } from "../models/product"
import { Category } from "../models/category"
import { Project } from "../models/projects"

const connection = new Sequelize({
  database: 'sisweb_db',
  dialect: 'postgres',
  username: 'sisweb_user',
  password: 'HDK#$%Ljkwerff.89',
  storage: ':memory:',
  models: [
      Product, Category, Project
  ]
});

async function connectionDB() {
  try {
    await connection.sync({ alter: true }); // Disabled when you're turning into production mode
  } catch(e) {
    console.log(e);
  }
}

export default connectionDB;