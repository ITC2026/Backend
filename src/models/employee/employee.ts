import { Table, Model, Column, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Pipeline } from './pipeline';
import { Hired } from './hired_employee';

interface EmployeeAttributes {
  id: number;
  name: string;
  region: string;
  division: string;
  title_job: string;
  grade_job: string;
  techStack: string;
  registrationDate: Date;
  phone: string;
  email: string;
}

interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'id'> {}

@Table({
  tableName: "Employee",
})
export class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> {
  @Column
  name!: string;

  @Column
  region!: string;

  @Column
  division!: string;

  @Column
  title_job!: string;

  @Column
  grade_job!: string;

  @Column
  techStack!: string;

  @Column
  registrationDate!: Date;

  @Column
  phone_number!: number;

  @Column
  email!: number;

  @ForeignKey(() => Pipeline)
  @Column
  pipelineId!: number;

  @BelongsTo(() => Pipeline)
  pipeline: Pipeline = new Pipeline();

  @ForeignKey(() => Hired)
  @Column
  hiredId!: number;

  @BelongsTo(() => Hired)
  hired: Hired = new Hired();

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
