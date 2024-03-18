import { Model, Column, CreatedAt, UpdatedAt, DataType, Table, HasMany} from 'sequelize-typescript';
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
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @HasMany(() => Project)
  projects!: Project[];
}