import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    HasMany,
    ForeignKey,
    BelongsTo,
    DataType,
    HasOne,
    PrimaryKey,
  } from "sequelize-typescript";
  import { Optional } from "sequelize";
  import { Client } from "../client/clients";
  import { Project } from "../project/projects";
  import { Position } from "../position/positions";
  import { TicketLog } from "./ticket_log";
  // import { Opening } from "../position/openings";
  // import { Application } from "../position/applications";
  // import { Person } from "../person/people";
  // import { User } from "../user/users";

  
  interface EntityAttributes {
    id: number;
    type: string;
    isDeleted: boolean;
    belongs_to_id: number;
  }
  
  interface EntityCreationAttributes extends Optional<EntityAttributes, "id"> {}
  
  @Table({
    tableName: "Entities",
  })
  export class Entity extends Model<EntityAttributes,EntityCreationAttributes> {
    @Column
    type!: string;
  
    @Column
    isDeleted!: boolean;
  
    @Column
    belongs_to_id!: number;
  
    @HasOne(() => TicketLog)
    ticketLog!: TicketLog;

    @HasOne(() => User)
    User!: User;

    @HasOne(() => Opening)
    Opening!: Opening;

    @HasOne(() => Client)
    Client!: Client;

    @HasOne(() => Project)
    Project!: Project;

    @HasOne(() => Position)
    Position!: Position;

    @HasOne(() => Application)
    Application!: Application;

    @HasOne(() => Person)
    Person!: Person;


  }
  