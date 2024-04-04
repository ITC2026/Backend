import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import { type Optional } from "sequelize";
  import { Position } from "./positions";
  
  interface CommentPositionAttributes {
    id: number;
    comment: string;
    position_id: number;
  }

  interface CommentPositionCreationAttributes extends Optional<CommentPositionAttributes, "id"> {}

@Table({
  tableName: "CommentPositions",
})
export class CommentPosition extends Model<
CommentPositionAttributes,
CommentPositionCreationAttributes
> {
    @Column
    comment!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    @ForeignKey(() => Position)
    @Column
    position_id!: number

    @BelongsTo(() => Position)
    project!: Position;
}