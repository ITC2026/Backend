import { Table, Model, Column, CreatedAt, UpdatedAt, HasOne } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Hired } from './hired_employee';

interface BillingAttributes {
  id: number;
  billing_since: Date;
  days_billing: number;
  hired: Hired;
}

interface BillingCreationAttributes extends Optional<BillingAttributes, 'id'>{}

@Table ({
  tableName: "Billing",
})
export class Billing extends Model<BillingAttributes, BillingCreationAttributes> {
  @Column
  billing_since!: Date;

  @Column
  days_billing!: number;

  @HasOne(() => Hired)
  hired!: Hired;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
