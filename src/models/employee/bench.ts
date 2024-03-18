import { Table, Model, Column, CreatedAt, UpdatedAt, HasOne } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Hired } from './hired_employee';

interface BenchAttributes {
  id: number
  bench_since: Date;
  days_bench: number;
}

interface BenchCreationAttributes extends Optional<BenchAttributes, 'id'>{}

@Table ({
  tableName: "Bench",
})
export class Bench extends Model<BenchAttributes, BenchCreationAttributes> {
  @Column
  bench_since!: Date;

  @Column
  bench_billing!: number;

  @HasOne(() => Hired)
  hired: Hired = new Hired();

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
