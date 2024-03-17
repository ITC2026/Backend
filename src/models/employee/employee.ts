import { Model, Column, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Optional } from 'sequelize';

interface EmployeeAttributes {
  id: number;
  region: string;
  division: string;
  title_job: string;
  grade_job: string;
  techstack: string;
  register_date: Date;
  phone_number: number;
  email: string;
}

interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'id'>{}

export abstract class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> {
  @Column
  region!: string;

  @Column
  division!: string;

  @Column
  title_job!: string;

  @Column
  grade_job!: string;

  @Column
  techstack!: string;

  @Column
  register_date!: Date;

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
