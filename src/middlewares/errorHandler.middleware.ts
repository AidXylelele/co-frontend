import { CustomError } from "src/utils/customError.util";
import { Request, Response } from "express";

export const errorHandler = (
  err: Error | CustomError,
  _req: Request,
  res: Response
) => {
  res.status(500).send(err.message);
};
