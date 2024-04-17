import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  HasMany,
  ForeignKey,
  BelongsTo,
  HasOne,
  DataType,
  DeletedAt
} from "sequelize-typescript";
import { type Optional } from "sequelize";
import { Position } from "../position/positions";
import { Client } from "../client/clients";
import { ExpirationDateProject } from "./expiration_date_project"
import { ClosedProject } from "./closed_project"
import { Entity } from "../ticketLog/entities";

interface ProjectAttributes {
  id: number;
  project_title: string;
  project_description: string;
  start_date: Date;
  has_expiration_date: boolean;
  general_status: string;
  positions: Position[];
  client_id: number;
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
        project_id: this.id,
      },
    });
  }

  @Column
  project_title!: string;

  @Column
  project_description!: string;

  @Column
  start_date!: Date;

  @Column
  has_expiration_date!: boolean;

  @Column(DataType.ENUM("In Preparation", "Active", "Closed"))
  general_status!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;

  @HasMany(() => Position)
  positions!: Position[];

  @HasOne(() => ExpirationDateProject)
  expiration_date?: ExpirationDateProject;

  @HasOne(() => ClosedProject)
  closed_project?: ClosedProject;

  @ForeignKey(() => Client)
  @Column
  client_id!: number;

  @BelongsTo(() => Client)
  client!: Client;

  @HasOne(() => Entity)
  entity!: Entity;
}
