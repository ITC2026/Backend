import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, HasMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Product } from './product';

interface CategoryAttributes{
  id: number;
  name: string;
  products: Product[];
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'>{}

@Table ({
  tableName: "Categories"
})

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {

  @Column
  name!: string;

  @HasMany(() => Product)
  products!: Product[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}