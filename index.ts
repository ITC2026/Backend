import express, { Express } from "express";
import apiRouter from "./src/routes";
import morgan from "morgan";

const app: Express = express();
const port = 3007;

app.use(morgan("dev"));
app.use(express.json());
app.use(apiRouter);

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
