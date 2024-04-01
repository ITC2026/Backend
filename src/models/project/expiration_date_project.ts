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
  import { Project } from "./projects";
  
  interface ExpirationDateProjectAttributes {
    id: number;
    expiration_date: Date;
    project_id: number;
  }

  interface ExpirationDateProjectCreationAttributes extends Optional<ExpirationDateProjectAttributes, "id"> {}

@Table({
  tableName: "ExpirationDateProjects",
})
export class ExpirationDateProject extends Model<
ExpirationDateProjectAttributes,
ExpirationDateProjectCreationAttributes
> {
    @Column
    expiration_date!: Date;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    @ForeignKey(() => Project)
    @Column
    project_id!: number

    @BelongsTo(() => Project)
    project!: Project;
}