import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    HasOne,
    DataType,
    DeletedAt
  } from "sequelize-typescript";
  import { Optional } from "sequelize";
  import { Position } from "./positions";
  import { ExpirationDateOpening } from "./expiration_date_openings"
  import { Person } from "../person/people";
  import { Entity } from "../ticketLog/entities";
  
  interface OpeningAttributes {
    id: number;
    opening_status: string;
    opening_reason: string;
    start_date: Date;
    has_expiration_date: boolean;
    position_id: number;
    person_id: number;
    person: Person;
  }
  
  interface OpeningCreatedAttributes extends Optional<OpeningAttributes, "id"> {}
  
  
  @Table({
    tableName: "Openings",
  })
  export class Opening extends Model<
    OpeningAttributes,
    OpeningCreatedAttributes
  > {
    getPerson(): Promise<Person[]> {
      return Person.findAll({
        where: {
          id: this.person_id
        },
      });
    }
  
    @Column(DataType.ENUM("New", "Filled", "Closed", "In Progress", "On Standby"))
    opening_status!: string;

    @Column(DataType.ENUM("In Progress", "On Standby", "Hired", "Replacement", "Budget Problem", "Filled By Itself", "Filled By Another", "No replied"))
    opening_reason!: string;

    @Column
    start_date!: Date;

    @Column
    has_expiration_date!: boolean;
  
    @ForeignKey(() => Position)
    @Column
    position_id!: number;
  
    @BelongsTo(() => Position)
    position!: Position;

    @HasOne(() => ExpirationDateOpening)
    expiration_date?: ExpirationDateOpening;
  
    @HasOne(() => Entity)
    entity!: Entity;

    @ForeignKey(() => Person)
    @Column
    person_id?: number;

    @BelongsTo(() => Person)
    person?: Person;
  
    @CreatedAt
    createdAt!: Date;
  
    @UpdatedAt
    updatedAt!: Date;

    @DeletedAt
    deletedAt!: Date;
  }
  