import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
  DataType,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Project } from "../project/projects";
import { Opening } from "./openings";
import { CommentPosition } from "./comments_positions"
import { Application } from "./applications"

interface PositionAttributes {
  id: number;
  position_title: string;
  division: string;
  region: string;
  tech_stack: string;
  bill_rate: number;
  posting_type: string;
  is_cross_division: boolean;
  is_exclusive: boolean;
  openings: Opening[];
  project_id: number;
}

interface PositionCreationAttributes
  extends Optional<PositionAttributes, "id"> {}

@Table({
  tableName: "Positions",
})
export class Position extends Model<
  PositionAttributes,
  PositionCreationAttributes
> {
  getOpenings(): Promise<Opening[]> {
    return Opening.findAll({
      where: {
        position_id: this.id,
      },
    });
  }

  @Column
  position_title!: string;

  @Column(DataType.ENUM("BRAZIL", "MEXICO", "CSA", "US"))
  division!: string;

  @Column(DataType.ENUM("CDMX", "CUU", "HMO", "MID", "SLP", "CAMPINA", "SAO PAULO", "COLOMBIA", "PERU", "COSTA RICA", "ARGENTINA", "DOMINICANA", "DALLAS", "PHOENIX"))
  region!: string;

  @Column(DataType.ENUM("Java", "React", "Python", "Automation", "Golang", "Javascript", "NET", "Angular", "Appian", "PowerApps", "ManualTester", "Kotlin", "UX", "iOS"))
  tech_stack!: string;

  @Column
  bill_rate!: number;

  @Column(DataType.ENUM("New Headcount", "Backfill Replacement"))
  posting_type!: string;

  @Column
  is_cross_division!: boolean;

  @Column
  is_exclusive!: boolean;

  @HasMany(() => Opening)
  openings!: Opening[];

  @HasMany(() => Application)
  application!: Application[];

  @HasOne(() => CommentPosition)
  comment?: CommentPosition;

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
