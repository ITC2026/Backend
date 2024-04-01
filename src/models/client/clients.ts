import {
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  Table,
  DataType,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Project } from "../project/projects";
import { Employee } from "../person/employees";
import { ClientEmployeeRelation } from "./client_employee_relations";

interface ClientAttributes {
  id: number;
  contract_pdf_url: string;
  logo_url: string;
  client_name: string;
  client_desc: string;
  high_growth: boolean;
  division: string;
  projects: Project[];
  employees: Employee[];
}

interface ClientCreationAttributes extends Optional<ClientAttributes, "id"> {}

@Table({
  tableName: "Clients",
})
export class Client extends Model<ClientAttributes, ClientCreationAttributes> {
  getProjects(): Promise<Project[]> {
    return Project.findAll({
      where: {
        client_id: this.id, // replace 'clientId' with the correct property name
      },
    });
  }

  @Column
  contract_pdf_url!: string;

  @Column
  logo_url!: string;

  @Column
  client_name!: string;

  @Column
  client_desc!: string;

  @Column
  high_growth!: boolean;

  @Column(DataType.ENUM("BRAZIL", "MEXICO", "CSA", "US"))
  division!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @HasMany(() => Project)
  projects!: Project[];

  @BelongsToMany(() => Employee, () => ClientEmployeeRelation)
  employees?: Employee[];
}
