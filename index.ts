import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/database";
sequelize;

import Tour from "./models/tour.model";

const app: Express = express();
const port: number | string  = process.env.PORT ||  3000;

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug');


import { clientRoute } from "./routes/client/index.route";
clientRoute(app);



app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})