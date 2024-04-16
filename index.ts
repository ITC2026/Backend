import express, { Express } from "express";
import apiRouter from "./src/routes";
import morgan from "morgan";
import  connectionDB from "./src/connection/connection";
import cors from "cors";


const app: Express = express();
const port = 3000;
 
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(apiRouter);

connectionDB();

app.listen(port, ()=> {
    console.log(`App listening on ${port}`);
});
