import { CustomError } from "src/utils/customError.util";
import { AuthedSocket } from "./socket.types";
import { NextFunction, Request, Response } from "express";

type SocketNextFunc = (error?: Error | CustomError) => void;

export type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type ExpressErrorMiddleware = (
  err: Error | CustomError,
  req: Request,
  res: Response
) => void;

export type SocketMiddleware = (
  socket: AuthedSocket,
  next: SocketNextFunc
) => void;
