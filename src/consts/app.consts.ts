import { SocketEvents } from "src/types/app.types";

export const socketEvents: SocketEvents = {
  connection: 'connection',
  login: "auth:login",
  register: "auth:register",
};
