import { Table, Model, Column, CreatedAt, UpdatedAt, HasOne } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Employee } from './employees';

interface PipelineAttributes {
  id: number;
  expected_salary: number;
  in_pipeline_since: Date;
  days_in_pipeline: number;
  employee: Employee;
}

interface PipelineCreationAttributes extends Optional<PipelineAttributes, 'id'>{}

@Table ({
  tableName: "Pipeline"
})
export class Pipeline extends Model<PipelineAttributes, PipelineCreationAttributes> {
  @Column
  expected_salary!: number;

  @Column
  in_pipeline_since!: Date;

  @Column
  days_in_pipeline!: number;

  @HasOne(() => Employee)
  employee!: Employee;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
