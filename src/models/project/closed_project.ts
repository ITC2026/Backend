import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    DataType,
  } from "sequelize-typescript";
  import { type Optional } from "sequelize";
  import { Project } from "./projects";
  
  interface ClosedProjectAttributes {
    id: number;
    closed_status: string;
    closed_reason: string;
    project_id: number;
  }

  interface ClosedProjectCreationAttributes extends Optional<ClosedProjectAttributes, "id"> {}

@Table({
  tableName: "ClosedProjects",
})
export class ClosedProject extends Model<
ClosedProjectAttributes,
ClosedProjectCreationAttributes
> {
    @Column(DataType.ENUM("Completed", "Cancelled"))
    closed_status!: string;

    @Column
    closed_reason!: string;

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