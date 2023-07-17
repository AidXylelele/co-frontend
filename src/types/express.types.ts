import { Request } from "express";
import { Login, Registration } from "./input.types";

export type RequestWithData = Request & {
  body: Login | Registration;
};
