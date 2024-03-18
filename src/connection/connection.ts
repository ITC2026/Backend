import { Sequelize } from "sequelize-typescript";
import { Project } from "../models/projects";
import { Position } from "../models/positions";
import { User } from "../models/user";

const connection = new Sequelize({
  database: "sisweb_db",
  dialect: "postgres",
  username: "sisweb_user",
  password: "HDK#$%Ljkwerff.89",
  storage: ":memory:",
  models: [Project, Position, User],
});

async function connectionDB() {
  try {
    await connection.sync({ alter: true }); // Disabled when you're turning into production mode
  } catch (e) {
    console.log(e);
  }
}

export default connectionDB;
