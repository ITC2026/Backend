import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Optional } from "sequelize";  
import { Project } from "./projects";

interface PositionAttributes {
  id: number;
  title_position: string;
  description_position: string;
  vacancies_position: number;
  publication_type_position: string;
  cross_division_position: boolean;
  division_position: string;
  region_position: string;
  tech_stack_position: string;
  demand_curation_position: string;
  is_exclusive_position: boolean;
  vacancy_id_position?: number;
  project: Project;
}

interface PositionCreationAttributes extends Optional<PositionAttributes, "id"> {}

@Table({
  tableName: "Positions",
})
export class Position extends Model<PositionAttributes, PositionCreationAttributes> {
  @Column
  title_position!: string;

  @Column
  description_position!: string;

  @Column
  vacancies_position!: number;

  @Column
  publication_type_position!: string;

  @Column
  cross_division_position!: boolean;

  @Column
  division_position!: string;

  @Column
  region_position!: string;

  @Column
  tech_stack_position!: string;

  @Column
  demand_curation_position!: string;

  @Column
  is_exclusive_position!: boolean;
  
  @Column
  vacancy_id_position!: number;

  @ForeignKey(() => Project)
  @Column
  project_id_position!: number;

  @BelongsTo(() => Project)
  project!: Project;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
