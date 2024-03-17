import { Table, Model, Column } from 'sequelize-typescript';
import { Employee } from './employee';

interface PipelineAttributes {
  expected_salary: number;
  in_pipeline_since: Date;
  days_in_pipeline: number;
}

@Table ({
  tableName: "Pipeline"
})

export class Pipeline extends Model<Employee, PipelineAttributes> {
  @Column
  expected_salary!: number;

  @Column
  in_pipeline_since!: Date;

  @Column
  days_in_pipeline!: number;
}
