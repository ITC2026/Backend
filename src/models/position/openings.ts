import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from "sequelize-typescript";
  import { Optional } from "sequelize";
  import { Position } from "./positions";
  import { Employee } from "../person/employees";
  import { Entity } from "../ticketLog/entities";

  enum OpeningStatus {
    "New", "Filled", "Closed", "In Progress", "On Standby"
  } 
  enum OpeningReason {
    "In Progress", "On Standby", "Hired", "Replacement", "Budget Problem", "Filled By Itself", "Filled By Another", "No Replied"
  }

  interface OpeningAttributes {
    id: number;
    opening_status: OpeningStatus;
    opening_reason: OpeningReason;
    start_date: Date;
    has_expiration_date: boolean;
    position_id: number;
    employee_id: number;
  }
  
  interface OpeningCreatedAttributes extends Optional<OpeningAttributes, "id"> {}
  
  @Table({
    tableName: "Opening",
  })
  export class Opening extends Model<
    OpeningAttributes,
    OpeningCreatedAttributes
  > {
    getEmployee(): Promise<Opening[]> {
      return Opening.findAll({
        where: {
          position_id: this.id,
        },
      });
    }
  
    @Column
    progress_vacancy!: string; // what ok
  
    @ForeignKey(() => Position)
    @Column
    position_id_vacancy!: number;
  
    @BelongsTo(() => Position)
    project: Position = new Position();
  
    @HasMany(() => Employee)
    employees!: Employee[];

    @ForeignKey(() => Entity)
    @Column 
    entity_id!: number;
    @BelongsTo(() => Entity)
    entity!: Entity;
  
    @CreatedAt
    createdAt!: Date;
  
    @UpdatedAt
    updatedAt!: Date;
  }
  