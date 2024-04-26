import {
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    Table,
    ForeignKey,
  } from "sequelize-typescript";
  import { Client } from "./clients";
  import { Person } from "../person/people";

  interface ClientPersonRelationAttributes {
    client_id: number;
    person_id: number;
  }

  @Table({
    tableName: "ClientPersonRelations",
  })
  export class ClientPersonRelation extends Model<ClientPersonRelationAttributes> {
    @ForeignKey(() => Client)
    @Column
    client_id!: number;

    @ForeignKey(() => Person)
    @Column
    person_id!: number;
  
    @CreatedAt
    @Column
    createdAt!: Date;
  
    @UpdatedAt
    @Column
    updatedAt!: Date;
  }