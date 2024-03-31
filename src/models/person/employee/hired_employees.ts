import { Table, Model, Column, CreatedAt, UpdatedAt, HasOne, ForeignKey, BelongsTo  } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Employee } from '../employees';
import { Billing } from '../billing';
import { Bench } from '../bench';
import { LargeNumberLike } from 'crypto';

//
//
// HIRED EMPLOYEES NO DEBE EXISTIR!! NOMAS NO LO BORRO PARA TENER ESTO FOR FUTURE REFERENCE
//
//

interface HiredAttributes {
  id: number;
  salary: number;
  contract_date: Date;
  start_working_date: Date;
  last_client: string;
  current_client: string;
  work_hours: number;
  employee: Employee;
  benchId: number;
  bench: Bench;
  billingId: number;
  billing: Billing;
}

interface HiredCreationAttributes extends Optional<HiredAttributes, 'id'>{}

@Table({
  tableName: "Hired Employees",
})
export class Hired extends Model<HiredAttributes, HiredCreationAttributes> {
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

  @HasOne(() => Employee)
  employee!: Employee;

  @ForeignKey(() => Bench)
  @Column
  benchId!: number;

  @BelongsTo(() => Bench)
  bench!: Bench;

  @ForeignKey(() => Billing)
  @Column
  billingId!: number;

  @BelongsTo(() => Billing)
  billing!: Billing;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
