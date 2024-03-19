import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
//   HasMany,
  } from "sequelize-typescript";
import { Optional } from "sequelize";  
import { Project } from "./projects";
  
  interface PositionAttributes {
    id?: number;
    title: string;
    description: string;
    vacancies: number;
    publication_type: string;
    cross_division: boolean;
    division: string;
    region: string;
    tech_stack:string;
    demand_curation: string;
    exclusivity: boolean;
    id_vacancy?: number;
    id_project?: number;
  }
  
  interface PositionCreationAttributes extends Optional<PositionAttributes, "id"> {}
  
  @Table({
    tableName: "Positions",
  })
  export class Position extends Model<PositionAttributes, PositionCreationAttributes> {
    @Column
    title!: string;
  
    @Column
    description!: string;
  
    @Column
    vacancies!: number;
  
    @Column
    publication_type!: string;
  
    @Column
    cross_division!: boolean;
  
    @Column
    division!: string;
  
    @Column
    region!: string;
  
    @Column
    tech_stack!: string;
  
    @Column
    demand_curation!: string;
  
    @Column
    exclusivity!: boolean;
    
    // @ForeignKey(() => Vacancy)
    @Column
    id_vacancy!: number;

    // @HasMany(() => Vacancy)
    // vacancy!: Vacancy[];
  
    @ForeignKey(() => Project)
    @Column
    id_project!: number;

    @BelongsTo(() => Project)
    project!: Project;
    

    @CreatedAt
    createdAt!: Date;
  
    @UpdatedAt
    updatedAt!: Date;

    
  }