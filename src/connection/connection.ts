import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";

const connection = new Sequelize({
    database: "encoring",
    dialect: "postgres",
    username: "postgres",
    password: "Prepa2019.",
    storage: ":memory:",
    models:[
        User
    ]
});

async function connectionDB(){
    try{
        await connection.sync();
    }catch(e){
        console.log(e);
    }
}
export default connectionDB;