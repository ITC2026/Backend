import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  DataType,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Person } from "./people";
import { Client } from "../client/clients";
import { ClientEmployeeRelation } from "../client/client_employee_relations";

interface EmployeeAttributes {
  id: number;
  job_title: string;
  salary: number;
  job_grade: string;
  proposed_action: string;
  employee_status: string;
  employee_reason: string;
  contract_start_date: Date;
  last_movement_at: Date;
  person_id: number;
}

interface EmployeeCreationAttributes
  extends Optional<EmployeeAttributes, "id"> {}

@Table({
  tableName: "Employees",
  timestamps: true,
})
export class Employee extends Model<
  EmployeeAttributes,
  EmployeeCreationAttributes
> {
  @Column
  job_title!: string;

  @Column
  salary!: number;

  @Column(DataType.ENUM("C3", "C4", "C5", "C6"))
  job_grade!: string;

  @Column(
    DataType.ENUM(
      "Project Search",
      "Using in internal project",
      "UpSkilling CrossTraining",
      "Backup Shadow other projects",
      "Resource Pool",
      "No action required",
      "Others",
      "Attrition"
    )
  )
  proposed_action!: string;

  @Column(DataType.ENUM("On Hired", "Layoff", "Resigned"))
  employee_status!: string;

  @Column(
    DataType.ENUM(
      "In training",
      "Induction orientation",
      "Shadow resource",
      "Awaiting client confirmation joining",
      "Maternity leave",
      "Sabbatical other leave",
      "Previous client attrition",
      "Previous client HCReduction",
      "Transition between projects",
      "No available projects",
      "Internal project",
      "Moved to billing",
      "Performance issues PIP",
      "Other",
      "Intern"
    )
  )
  employee_reason!: string;

  @CreatedAt
  @Column
  contract_start_date!: Date;

  @UpdatedAt
  @Column
  last_movement_at!: Date;

  @ForeignKey(() => Person)
  @Column
  person_id!: number;

  @BelongsTo(() => Person)
  person!: Person;

  @BelongsToMany(() => Client, () => ClientEmployeeRelation)
  client?: Client[];
}
