import { Table, Model, Column, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Pipeline } from './pipeline';
import { Opening } from '../position/openings';

interface EmployeeAttributes {
  id: number;
  name: string;
  region: string;
  division: string;
  title_job: string;
  grade_job: string;
  tech_stack: string;
  registration_date: Date;
  phone: string;
  email: string;
  pipelineId: number;
  pipeline: Pipeline;
  hiredId: number;
}

interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'id'> {}

@Table({
  tableName: "Employee",
  timestamps: true
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
  tech_stack!: string;

  @Column
  registration_date!: Date;

  @Column
  phone_number!: number;

  @Column
  email!: string;

  @ForeignKey(() => Pipeline)
  @Column
  pipelineId!: number;

  @BelongsTo(() => Pipeline)
  pipeline!: Pipeline;

  @ForeignKey(() => Opening)
  @Column
  vacancyId!: number;

  @BelongsTo(() => Opening)
  vacancy!: Opening;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
