import { Request } from "express";
import { ApprovalQueries, Login, Registration } from "./input.types";

export type RequestWithData<T> = Request & { body: T };

export type LoginRequest = RequestWithData<Login>;

export type RegisterRequest = RequestWithData<Registration>;

export type ApprovalRequest = Request & { query: ApprovalQueries };
