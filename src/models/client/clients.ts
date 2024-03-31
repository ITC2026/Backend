import {
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  Table,
  HasMany,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Project } from "../project/projects";

interface ClientAttributes {
  id: number;
  contract_pdf_url: string;
  logo_url: string;
  client_name: string;
  client_desc: string;
  exclusivity: string;
  high_growth: boolean;
  division: string;
  projects: Project[];
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
  exclusivity!: string;

  @Column
  high_growth!: boolean;

  @Column
  division!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @HasMany(() => Project)
  projects!: Project[];
}
