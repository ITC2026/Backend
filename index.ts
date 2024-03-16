import express, { Express } from "express";
import apiRouter from "./src/routes";
import morgan from "morgan";

const app: Express = express();
const port = 3007;
//Vi que van usar una coneccion en vez de un config para conectar a la db, avisen que quieren
// const db = require('./src/models') 

app.use(morgan("dev"));
app.use(express.json());
app.use(apiRouter);

// db.sequelize.sync()
//  .then(() => {
//  console.log("Synced db.");
//  })
//  .catch((err:Error) => {
//  console.log("Failed to sync db: " + err.message);
//  });  

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
