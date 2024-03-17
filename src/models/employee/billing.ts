import { Table, Model, Column } from 'sequelize-typescript';
import { Hired } from './hired_employee';

interface BillingtAttributes {
  billing_since: Date;
  days_billing: number;
}

@Table ({
  tableName: "Billing",
})

export class Billing extends Model<Hired, BillingtAttributes> {
  @Column
  billing_since!: Date;

  @Column
  days_billing!: number;
}
