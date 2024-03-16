import { Sequelize } from "sequelize-typescript";
import { Project } from "../models/projects";
import { Position } from "../models/positions";

// ??? Change the database name, username and password

const connection = new Sequelize({
  database: "sisweb_db",
  dialect: "postgres",
  username: "sisweb_user",
  password: "HDK#$%Ljkwerff.89",
  storage: ":memory:",
  models: [Project, Position] 
});

async function connectionDB() {
  try {
    await connection.sync();
  } catch (e) {
    console.log(e);
  }
}

export default connectionDB;
