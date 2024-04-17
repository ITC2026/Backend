import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    DataType,
    DeletedAt,
    HasOne,
  } from "sequelize-typescript";
  import { type Optional } from "sequelize";
  import { Position } from "./positions";
  import { Person } from "../person/people";
  import { Entity } from "../ticketLog/entities";
  
  interface ApplicationAttributes {
    id: number;
    application_status: string;
    position_id: number;
    person_id: number;
  }

  interface ApplicationCreationAttributes extends Optional<ApplicationAttributes, "id"> {}

@Table({
  tableName: "Applications",
})
export class Application extends Model<
ApplicationAttributes,
ApplicationCreationAttributes
> {
    @Column(DataType.ENUM("Accepted", "Rejected", "Scheduled For Interview", "Waiting on Client Response", "On Hold"))
    application_status!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    @DeletedAt
    deletedAt!: Date;

    @ForeignKey(() => Position)
    @Column
    position_id!: number;

    @BelongsTo(() => Position)
    position!: Position;

    @HasOne(() => Entity)
    entity?: Entity;

    @ForeignKey(() => Person)
    @Column
    person_id!: number;

    @BelongsTo(() => Person)
    person!: Person;
}