import {
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    Table,
    ForeignKey,
  } from "sequelize-typescript";
  import { Client } from "./clients";
  import { Employee } from "../person/employees";

  interface ClientEmployeeRelationAttributes {
    client_id: number;
    employee_id: number;
  }

  @Table({
    tableName: "ClientEmployeeRelations",
  })
  export class ClientEmployeeRelation extends Model<ClientEmployeeRelationAttributes> {
    @ForeignKey(() => Client)
    @Column
    client_id!: number;

    @ForeignKey(() => Employee)
    @Column
    employee_id!: number;
  
    @CreatedAt
    @Column
    createdAt!: Date;
  
    @UpdatedAt
    @Column
    updatedAt!: Date;
  }