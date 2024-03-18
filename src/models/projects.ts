import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  HasMany,
  ForeignKey,
  HasOne,
} from "sequelize-typescript";
import { type Optional } from "sequelize";
import { Position } from "./positions";
import { Client } from "./clients";

interface ProjectAttributes {
  id: number;
  title_project: string;
  description_project: string;
  tariff_project: number;
  publicationDate_project: Date;
  deadline_project: Date;
  positions: Position[];
  project_status: number;
  id_client: number;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> {}

@Table({
  tableName: "Projects",
})
export class Project extends Model<
  ProjectAttributes,
  ProjectCreationAttributes
> {
  getPositions(): Promise<Position[]> {
    return Position.findAll({
      where: {
        id_project: this.id,
      },
    });
  }

  @Column
  title_project!: string;

  @Column
  description_project!: string;

  @Column
  tariff_project!: number;

  @CreatedAt
  publicationDate_project!: Date;

  @UpdatedAt
  deadline_project!: Date;

  @HasOne(() => Client)
  client!: Client;

  @ForeignKey (() => Client)
  @Column
  client_id!: number;

  @HasMany(() => Position)
  positions!: Position[];

  @Column
  project_status!: number;

}
