import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("trang chu");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})