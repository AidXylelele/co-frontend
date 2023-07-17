import { NextFunction, Request, Response } from "express";

export const repsonseHandler =
  (fn: any) => async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await fn();
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
