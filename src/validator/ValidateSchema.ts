import { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from "express";
import Logging from "../library/Logging";

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (e) {
      Logging.error(e);
      return res.status(422).json({e});
    }
  }
}
