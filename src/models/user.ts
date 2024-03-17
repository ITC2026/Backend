import {Table, Model, Column, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript';
import {Optional} from 'sequelize';

interface UserAttributes {
    id: number;
    username: string;
    password: string;
    email: string;
    role: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
    tableName: 'Users'
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Column
    username!: string;

    @Column
    password!: string;

    @Column
    email?: string;

    @Column
    role!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}