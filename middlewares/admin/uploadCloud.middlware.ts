import { NextFunction, Request, Response } from "express";
import { streamUpload } from "../../helpers/streamUpload.helper";

export const uploadSingle = async (req: Request, res: Request, next: NextFunction) => {
  if(req["files"]){
    const result = await streamUpload(req["file"].buffer);
    req.body[req["file"].fieldname] = result["url"];
  }
  next();
}

export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
  try {
    for (const key in req["files"]) {
      req.body[key] = [];
  
      const array = req["files"][key];
      for (const item of array) {
        const result = await streamUpload(item.buffer);
        req.body[key].push(result["url"]);
      }
    }
  
    next();
  } catch (error) {
    console.log(error);
  }
}