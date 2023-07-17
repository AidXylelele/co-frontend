import { Request, Response } from "express";
import { CustomError } from "src/utils/customError.util";

export const errorHandler = (
  err: Error | CustomError,
  _req: Request,
  res: Response
) => {
  res.status(500).send(err.message);
};
