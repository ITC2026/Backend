import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Person } from "./people";

interface CandidateAttributes {
  id: number;
  expected_salary: number;
  person_id: number;
  created_at: Date;
  updated_at: Date;
}

interface CandidateCreationAttributes
  extends Optional<CandidateAttributes, "id"> {}

@Table({
  tableName: "Candidates",
})
export class Candidate extends Model<
  CandidateAttributes,
  CandidateCreationAttributes
> {
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
