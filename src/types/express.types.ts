import { Request } from "express";
import { ApprovalQueries } from "./transaction.types";
import { Login, Registration } from "./auth.types";

export type RequestWithData<T> = Request & { body: T };

export type LoginRequest = RequestWithData<Login>;

export type RegisterRequest = RequestWithData<Registration>;

export type ApprovalRequest = Request & { query: ApprovalQueries };
