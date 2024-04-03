import { Sequelize } from "sequelize-typescript";
import { Employee } from "../models/person/employees";
import { Bench } from "../models/person/bench";
import { Billing } from "../models/person/billing";
import { Pipeline } from "../models/person/pipeline";
import { Hired } from "../models/person/employee/hired_employees";
import { Project } from "../models/project/projects";
import { Position } from "../models/position/positions";
import { Vacancy } from "../models/position/vacancies";
import { User } from "../models/user/user";
import { Client } from "../models/client/clients";
import { ClientEmployeeRelation } from "../models/client/client_employee_relations";
import { Role } from "../models/user/roles";
import { RoleUserRelation } from "../models/user/role_user_relation";
import { ExpirationDateProject } from "../models/project/expiration_date_project";
import { ClosedProject } from "../models/project/closed_project";

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
    ClientEmployeeRelation,
    Project,
    ExpirationDateProject,
    ClosedProject,
    Position,
    Vacancy,
    User,
    Role,
    RoleUserRelation,
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
