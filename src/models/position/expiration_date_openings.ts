import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import { type Optional } from "sequelize";
  import { Opening } from "./openings";
  
  interface ExpirationDateOpeningAttributes {
    id: number;
    expiration_date: Date;
    opening_id: number;
  }

  interface ExpirationDateOpeningCreationAttributes extends Optional<ExpirationDateOpeningAttributes, "id"> {}

@Table({
  tableName: "ExpirationDateOpenings",
})
export class ExpirationDateOpening extends Model<
ExpirationDateOpeningAttributes,
ExpirationDateOpeningCreationAttributes
> {
    @Column
    expiration_date!: Date;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    @ForeignKey(() => Opening)
    @Column
    opening_id!: number

    @BelongsTo(() => Opening)
    opening!: Opening;
}