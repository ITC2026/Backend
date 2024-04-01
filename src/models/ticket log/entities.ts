import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    HasMany,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import { type Optional } from "sequelize";
  import { Client } from "../client/clients";
  import { Project } from "../project/projects";
  import { Position } from "../position/positions";
  import { Opening } from "../position/openings";
  import { Application } from "../position/applications";
  import { Person } from "../person/people";
  import { User } from "../user/users";

  
  enum EntityType {
    "Clients", "Projects", "Positions", "Openings", "Applications", "People", "Users"
    }

  interface EntityAttributes {
    id: number;
    type: EntityType;
    isDeleted: boolean;
    belongs_to_id: number;
  }
  
  interface EntityCreationAttributes extends Optional<EntityAttributes, "id"> {}
  
  @Table({
    tableName: "Entities",
  })
  export class Entity extends Model<EntityAttributes,EntityCreationAttributes> {
    @Column
    type!: EntityType;
  
    @Column
    isDeleted!: boolean;
  
    @Column
    belongs_to_id!: number;
  
    @CreatedAt
    publicationDate_project!: Date;
  
    @UpdatedAt
    deadline_project!: Date;
  
    @HasMany(() => Position)
    positions!: Position[];
  
    @ForeignKey(() => Client)
    @Column
    client_id!: number;
  
    @BelongsTo(() => Client)
    client!: Client;
  }
  