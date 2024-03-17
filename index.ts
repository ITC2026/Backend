<<<<<<< HEAD
import express, {Express, Request, Response} from 'express';
import apiRouter from './src/routes'
import connectionDB from './src/connection/connection';
=======
import express, { Express } from "express";
import apiRouter from "./src/routes";
import morgan from "morgan";

>>>>>>> 5acb733d68e42cc4850f7e6cfca18472649e9a76
const app: Express = express();

const morgan = require('morgan');
const port = 3007;

app.use(morgan("dev"));
app.use(express.json());
app.use(apiRouter);

<<<<<<< HEAD
connectionDB();

app.listen(port, ()=> {
    console.log(`App listening on ${port}`);
});
=======
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
>>>>>>> 5acb733d68e42cc4850f7e6cfca18472649e9a76
