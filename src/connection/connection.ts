import { Sequelize } from "sequelize-typescript";
import { Employee } from "../models/employee/employee";
import { Bench } from "../models/employee/bench";
import { Billing } from "../models/employee/billing";
import { Pipeline } from "../models/employee/pipeline";
import { Hired } from "../models/employee/hired_employee";
import { Project } from "../models/projects";
import { Position } from "../models/positions";
import { Vacancy } from "../models/vacancies";
import { User } from "../models/user";
import { Client } from "../models/clients";

const connection = new Sequelize({
  database: "sisweb_db",
  dialect: "postgres",
  username: "sisweb_user",
  password: "HDK#$%Ljkwerff.89",
  storage: ":memory:",
  host: "localhost",
  models: [
    Employee,
    Bench,
    Billing,
    Pipeline,
    Hired,
    Client,
    Project,
    Position,
    Vacancy,
    User,
  ],
});

async function connectionDB() {
  try {
    await connection.sync({ alter: true }); // Disabled when you're turning into production mode
  } catch (e) {
    console.log(e);
  }
}

export default connectionDB;
