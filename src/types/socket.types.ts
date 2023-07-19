import { Socket } from "socket.io";
import { Collection } from "./common.types";
import { PassportData } from "./auth.types";

export type AuthedSocket = Socket & {
  user?: PassportData;
};

export type  SocketEvents = Collection<string>