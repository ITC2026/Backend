import { Table, Model, Column } from 'sequelize-typescript';
import { Hired } from './hired_employee';

interface BenchAttributes {
  bench_since: Date;
  days_bench: number;
}

@Table ({
  tableName: "Bench",
})

export class Bench extends Model<Hired, BenchAttributes> {
  @Column
  bench_since!: Date;

  @Column
  bench_billing!: number;
}
