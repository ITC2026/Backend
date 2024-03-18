import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
} from "sequelize-typescript";
import { Optional } from "sequelize";
// import isEmail from 'validator/lib/isEmail';
// import { validator } from 'sequelize/types/utils/validator-extras';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table({
  tableName: "Users",
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column
  username!: string;

  @Column
  password!: string;

  @Column
  email?: string;

  @Column(DataType.ENUM("Account Manager", "Resource Manager", "Staffer"))
  role!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
