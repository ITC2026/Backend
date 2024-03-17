import express, {Express, Request, Response} from 'express';
import apiRouter from './src/routes'
import connectionDB from './src/connection/connection';
const morgan = require('morgan');

const app: Express = express();
const port = 3007;

app.use(morgan('dev'));
app.use(express.json());
app.use(apiRouter);

connectionDB();

app.listen(port, ()=> {
    console.log(`App listening on ${port}`);
});