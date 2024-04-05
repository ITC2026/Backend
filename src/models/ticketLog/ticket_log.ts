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
import { User } from "../user/user";
import { Entity } from "./entities"; // Assuming this is the correct path to the Entity model

enum ActionType {
    "Create",
    "Update",
    "Delete"
}

interface TicketLogAttributes {
    id: number;
    action: string;
    user_id: number;
    entity_id: number;
}

interface TicketLogCreationAttributes extends Optional<TicketLogAttributes, "id"> {}

@Table({
    tableName: "TicketLogs", // Corrected table name to remove spaces
})
export class TicketLog extends Model<TicketLogAttributes, TicketLogCreationAttributes> {
    @Column
    action!: string;

    @ForeignKey(() => User)
    @Column({ field: 'user_id' }) // Specify field name to match attribute name
    userId!: number; // Updated to match attribute name
    @BelongsTo(() => User, 'user_id') // Corrected association with foreign key
    user!: User;

    @ForeignKey(() => Entity)
    @Column({ field: 'entity_id' }) // Specify field name to match attribute name
    entityId!: number; // Updated to match attribute name
    @BelongsTo(() => Entity, 'entity_id') // Corrected association with foreign key
    entity!: Entity;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}
