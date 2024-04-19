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
  salary!: number;

  @Column(DataType.ENUM("C3", "C4", "C5", "C6"))
  job_grade!: string;

  @Column(
    DataType.ENUM(
      "Project Search",
      "Using In Internal Project",
      "Upskilling Crosstraining",
      "Backup / Shadow other projects",
      "Resource Pool",
      "No Action Required",
      "Others",
      "Attrition"
    )
  )
  proposed_action!: string;

  @Column(DataType.ENUM("On Hired", "Layoff", "Resigned"))
  employee_status!: string;

  @Column(
    DataType.ENUM(
      "In Training",
      "Induction / Orientation",
      "Shadow Resources",
      "Awaiting Client Confirmation Joining",
      "Maternity Leave",
      "Sabbatical / Other Leave",
      "Previous Client Attrition",
      "Previous Client HC Reduction",
      "Transition Between Projects",
      "No Available Projects",
      "Internal Project",
      "Moved to Billing",
      "Performance Issues / PIP",
      "Other",
      "Intern"
    )
  )
  employee_reason!: string;

  @Column
  contract_start_date!: Date;

  @Column
  last_movement_at!: Date;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @ForeignKey(() => Person)
  @Column
  person_id!: number;

  @BelongsTo(() => Person)
  person!: Person;

  @BelongsToMany(() => Client, () => ClientEmployeeRelation)
  clients?: Client[];

}
