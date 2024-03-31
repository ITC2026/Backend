import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
  } from "sequelize-typescript";
  import { Role } from './roles';
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