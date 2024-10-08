import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/database";
sequelize;

import bodyParser from "body-parser";

const app: Express = express();
const port: number | string  = process.env.PORT ||  3000;

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug');


app.use(express.static(`${__dirname}/public`))

app.use(bodyParser.json());

import { clientRoute } from "./routes/client/index.route";
import { dirname } from "path";
clientRoute(app);



app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})