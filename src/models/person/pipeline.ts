import { Table, Model, Column, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Person } from './people';

interface PipelineAttributes {
  id: number;
  expected_salary: number;
  person_id: number;
}

interface PipelineCreationAttributes extends Optional<PipelineAttributes, 'id'>{}

@Table ({
  tableName: "Pipeline"
})
export class Pipeline extends Model<PipelineAttributes, PipelineCreationAttributes> {
  @Column
  expected_salary!: number;

  @ForeignKey(() => Person)
  @Column
  person_id!: number;

  @BelongsTo(() => Person)
  person!: Person;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
