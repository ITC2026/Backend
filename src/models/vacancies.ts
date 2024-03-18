import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
import { Optional } from "sequelize";  
import { Position } from "./positions";
//import { Employee } from "./employees";

interface VacancyAttributes {
    id: number;
    progess_vacancy: string;
    position_id_vacancy: number;
    position: Position;
    employees: number;
}

interface VacancyCreatedAttributes extends Optional<VacancyAttributes, "id"> {}

@Table({
    tableName: "Vacancy",   
})

export class Vacancy extends Model<VacancyAttributes, VacancyCreatedAttributes> {
    @Column
    progress_vacancy!: string;

    @ForeignKey(()=> Position)
    @Column
    position_id_vacancy!: number;

    @BelongsTo(() => Position)
    project: Position = new Position();

    // @HasMany(() => Employee)
    // employeees!: Employee[];
    
    @Column
    employees!: number;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}
