import { Socket } from "socket.io";
import { PassportData } from "./auth.types";

export type AuthedSocket = Socket & {
  user?: PassportData;
};

