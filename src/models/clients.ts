import { Model, Column, CreatedAt, UpdatedAt, DataType, Table, HasMany, ForeignKey} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Project } from './projects';


interface ClientAttributes {
  id: number;
  contract_pdf_url: string;
  logo_url: string;
  client_name: string;
  client_desc: string;
  exclusivity: string;
  high_growth: boolean;
  division: string;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, 'id'> {}

@Table({
  tableName: 'Clients'
})

export class Client extends Model<ClientAttributes, ClientCreationAttributes> {

  getProjects(): Promise<Project[]> {
    return Project.findAll({
      where: {
        id_client: this.id,
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
  @ForeignKey(() => Project)
  projects!: Project[];
}