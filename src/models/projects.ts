import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { type Optional } from "sequelize";

// TODO: Check projects from ER diagram
// ??? Maybe dates are necessary

interface ProjectAttributes {
  id: number;
  name: string;
  description: string;
  company: string;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> {}

@Table({
  tableName: "Projects",
})
export class Project extends Model<
  ProjectAttributes,
  ProjectCreationAttributes
> {
  @Column
  name!: string;

  @Column
  description!: string;

  @Column
  company!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
