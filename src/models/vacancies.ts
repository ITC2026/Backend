import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Position } from "./positions";
import { Employee } from "./employee/employee";

interface VacancyAttributes {
  id: number;
  progress_vacancy: string;
  position_id_vacancy: number;
  position: Position;
  employeeId: number;
}

interface VacancyCreatedAttributes extends Optional<VacancyAttributes, "id"> {}

@Table({
  tableName: "Vacancy",
})
export class Vacancy extends Model<
  VacancyAttributes,
  VacancyCreatedAttributes
> {
  getEmployee(): Promise<Vacancy[]> {
    return Vacancy.findAll({
      where: {
        position_id_vacancy: this.id,
      },
    });
  }

  @Column
  progress_vacancy!: string;

  @ForeignKey(() => Position)
  @Column
  position_id_vacancy!: number;

  @BelongsTo(() => Position)
  project: Position = new Position();

  @HasMany(() => Employee)
  employees!: Employee[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
