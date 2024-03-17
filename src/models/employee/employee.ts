import { Model, Column, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Optional } from 'sequelize';

interface EmployeeAttributes {
  id: number;
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

export class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> {
  @Column
  id!: number;

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

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
