import { Model, Column, CreatedAt, UpdatedAt, DataType, Table} from 'sequelize-typescript';
import { Optional } from 'sequelize';

interface ClientAttributes {
  id: number;
  contract_pdf_url: URL;
  logo_url: URL;
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
  contract_pdf_url!: URL;

  @Column
  logo_url!: URL;

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
}