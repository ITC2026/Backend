import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
  HasOne,
  DeletedAt,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Role } from './roles';
import { RoleUserRelation } from './role_user_relation';
import { Entity } from '../ticketLog/entities';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  division: string;
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

  @Column(DataType.ENUM("BRAZIL", "MEXICO", "CSA", "US"))
  division!: string;

  @BelongsToMany(() => Role, () => RoleUserRelation)
  roles!: Role[];

  @HasOne(() => Entity)
  entity!: Entity;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;
}
