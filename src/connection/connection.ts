import { Sequelize } from "sequelize-typescript";
import { Person } from "../models/person/people";
import { Employee } from "../models/person/employees";
import { Candidate } from "../models/person/candidates";
import { Project } from "../models/project/projects";
import { ExpirationDateProject } from "../models/project/expiration_date_project";
import { ClosedProject } from "../models/project/closed_project";
import { Position } from "../models/position/positions";
import { Opening } from "../models/position/openings";
import { ExpirationDateOpening } from "../models/position/expiration_date_openings";
import { CommentPosition } from "../models/position/comments_positions";
import { Application } from "../models/position/applications";
import { User } from "../models/user/user";
import { Client } from "../models/client/clients";
import { TicketLog } from "../models/ticketLog/ticket_log";
import { Entity } from "../models/ticketLog/entities";
import { ClientPersonRelation } from "../models/client/client_person_relations";
import { Role } from "../models/user/roles";
import { RoleUserRelation } from "../models/user/role_user_relation";

const connection = new Sequelize({
  database: "proyectoFinal",
  dialect: "postgres",
  username: "sisweb_user",
  password: "HDK#$%Ljkwerff.89",
  storage: ":memory:",
  host: "localhost",
  models: [
    Person,
    Employee,
    Candidate,
    Client,
    ClientPersonRelation,
    Project,
    ExpirationDateProject,
    ClosedProject,
    Position,
    Opening,
    User,
    TicketLog,
    Entity,
    Role,
    RoleUserRelation,
    Application,
    CommentPosition,
    ExpirationDateOpening,
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
