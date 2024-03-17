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
//Vi que van usar una coneccion en vez de un config para conectar a la db, avisen que quieren
// const db = require('./src/models') 

app.use(morgan("dev"));
app.use(express.json());
app.use(apiRouter);

<<<<<<< HEAD
<<<<<<< HEAD
connectionDB();

app.listen(port, ()=> {
    console.log(`App listening on ${port}`);
});
=======
=======
// db.sequelize.sync()
//  .then(() => {
//  console.log("Synced db.");
//  })
//  .catch((err:Error) => {
//  console.log("Failed to sync db: " + err.message);
//  });  

>>>>>>> 9429c1644b986b202ed1acd8b8654d11b36070ff
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
>>>>>>> 5acb733d68e42cc4850f7e6cfca18472649e9a76
