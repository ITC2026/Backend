import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Role } from './role';
import { RoleUserRelation } from './roleUserRelation';
// import isEmail from 'validator/lib/isEmail';
// import { validator } from 'sequelize/types/utils/validator-extras';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  roles: Role[];
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
  email!: string;

  @BelongsToMany(() => Role, () => RoleUserRelation)
  roles!: Role[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
