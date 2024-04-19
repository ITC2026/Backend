import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    DataType,
    BelongsToMany,
  } from "sequelize-typescript";
  import { Optional } from "sequelize";
  import { User } from './user'
  import { RoleUserRelation } from './role_user_relation';

  interface RoleAttributes {
    id: number;
    role_name: string;
    users: User[];
  }
  interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> {}

  @Table({
    tableName: "Roles",
  })
  export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
    @Column(DataType.ENUM("Admin", "Account", "Resource", "Staffer"))
    role_name!: string;

    @BelongsToMany(() => User, () => RoleUserRelation)
    users?: User[];
  
    @CreatedAt
    @Column
    createdAt!: Date;
  
    @UpdatedAt
    @Column
    updatedAt!: Date;
  }