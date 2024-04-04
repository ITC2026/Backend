import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    HasOne,
  } from "sequelize-typescript";
  import { Optional } from "sequelize";
  import { Position } from "./positions";
  import { ExpirationDateOpening } from "./expiration_date_openings"
  import { Person } from "../person/people";
  
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
  
    @Column
    opening_status!: string;

    @Column
    opening_reason!: string;

    @Column
    start_date!: Date;

    @Column
    has_expiration_date!: boolean;
  
    @ForeignKey(() => Position)
    @Column
    position_id!: number;
  
    @BelongsTo(() => Position)
    project!: Position;

    @HasOne(() => ExpirationDateOpening)
    expiration_date?: ExpirationDateOpening;
  
    @ForeignKey(() => Person)
    @Column
    person_id!: number;

    @BelongsTo(() => Person)
    person!: Person;
  
    @CreatedAt
    createdAt!: Date;
  
    @UpdatedAt
    updatedAt!: Date;
  }
  