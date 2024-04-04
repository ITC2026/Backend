import { Table, Model, Column, CreatedAt, UpdatedAt, HasOne, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Application } from '../position/applications';
import { Opening } from '../position/openings';
import { Employee } from './employees';
import { Pipeline } from './pipeline';
import { Entity } from '../ticketLog/entities';

interface PersonAttributes {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
  gender: string;
  phone: string;
  email: string;
  title: string;
  tech_stack: string;
  division: string;
  region: string;
  status: string;
  movement_reason: string;
  
}

interface PersonCreationAttributes extends Optional<PersonAttributes, 'id'>{}

@Table ({
  tableName: "People"
})
export class Person extends Model<PersonAttributes, PersonCreationAttributes> {
    @Column
    profile_picture?: string;

    @Column
    first_name!: string;

    @Column
    last_name!: string;

    @Column(DataType.ENUM("Male", "Female", "Nonbinary", "Did Not Want to Say"))
    gender!: string;

    @Column
    phone!: string;

    @Column
    email!: string;

    @Column
    title!: string;

    @Column(DataType.ENUM("Java", "React", "Python", "Automation", "Golang", "Javascript", "NET", "Angular", "Appian", "PowerApps", "ManualTester", "Kotlin", "UX", "iOS"))
    tech_stack!: string;

    @Column(DataType.ENUM("BRAZIL", "MEXICO", "CSA", "US"))
    division!: string;

    @Column(DataType.ENUM("CDMX", "CUU", "HMO", "MID", "SLP", "CAMPINA", "SAO PAULO", "COLOMBIA", "PERU", "COSTA RICA", "ARGENTINA", "DOMINICANA", "DALLAS", "PHOENIX"))
    region!: string;

    @Column(DataType.ENUM("Pipeline", "Bench", "Billing"))
    status!: string;

    @Column
    movement_reason?: string;

    @HasOne(() => Application)
    application?: Application;

    @HasOne(() => Opening)
    opening?: Opening;

    @HasOne(() => Pipeline)
    pipeline?: Pipeline;

    @HasOne(() => Employee)
    employee?: Employee;

    @ForeignKey(() => Entity)
    @Column 
    entity_id?: number;
    @BelongsTo(() => Entity)
    entity?: Entity;

    @CreatedAt
    @Column
    created_at!: Date;

    @UpdatedAt
    @Column
    updated_at!: Date;
}
