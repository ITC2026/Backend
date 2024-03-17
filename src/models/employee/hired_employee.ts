import { Model, Column } from 'sequelize-typescript';
import { Employee } from './employee';

interface HiredAttributes {
  salary: number;
  contract_date: Date;
  start_working_date: Date;
  last_client: string;
  current_client: string;
  work_hours: number;
}

export abstract class Hired extends Model<Employee, HiredAttributes> {
  @Column
  salary!: number;

  @Column
  contract_date!: Date;

  @Column
  start_working_date!: Date;

  @Column
  last_client!: string;

  @Column
  current_client!: string;

  @Column
  work_hours!: number;
}
