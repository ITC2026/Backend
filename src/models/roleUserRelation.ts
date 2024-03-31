import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
  } from "sequelize-typescript";
  import { Optional } from "sequelize";
  import { Role } from './role';
  import { User } from './user';

  interface RoleUserRelationAttributes {
    role_id: number;
    user_id: number;
  }

  @Table({
    tableName: "RoleUserRelations",
  })
  export class RoleUserRelation extends Model<RoleUserRelationAttributes> {
    @ForeignKey(() => Role)
    @Column
    role_id!: number;

    @ForeignKey(() => User)
    @Column
    user_id!: number;
  
    @CreatedAt
    @Column
    createdAt!: Date;
  
    @UpdatedAt
    @Column
    updatedAt!: Date;
  }