import { NextFunction, Request, Response } from "express";
import { Socket } from "socket.io";
import { CustomError } from "src/utils/customError.util";
import { User } from "./passport.types";

type ExtendedSocket = Socket & {
  user?: User;
};

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
  socket: ExtendedSocket,
  next: SocketNextFunc
) => void;
