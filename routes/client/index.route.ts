import { Express } from "express";
import { tourRoute } from "./tour.route";
import { homeRoute } from "./home.route";
import { categoryRoute } from "./category.route";

export const clientRoute = (app: Express) => {
  app.use("/", homeRoute);
  app.use("/tours", tourRoute);
  app.use("/categories", categoryRoute);
}