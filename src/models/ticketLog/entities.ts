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
  import { Opening } from "../position/openings";
  import { Application } from "../position/applications";
  import { Person } from "../person/people";
  import { User } from "../user/user";

  
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
    ticketLog?: TicketLog;

    @ForeignKey(() => User)
    user_id?: number;
    @BelongsTo(() => User)
    User?: User;

    @ForeignKey(() => Opening)
    opening_id?: number;
    @BelongsTo(() => Opening)
    Opening?: Opening;

    @ForeignKey(() => Client)
    client_id?: number;
    @BelongsTo(() => Client)
    Client?: Client;

    @ForeignKey(() => Project)
    project_id?: number;
    @BelongsTo(() => Project)
    Project?: Project;

    @ForeignKey(() => Position)
    position_id?: number;
    @BelongsTo(() => Position)
    Position?: Position;

    @ForeignKey(() => Application)
    application_id?: number;
    @BelongsTo(() => Application)
    Application?: Application;

    @ForeignKey(() => Person)
    person_id?: number;
    @BelongsTo(() => Person)
    Person?: Person;


  }
  