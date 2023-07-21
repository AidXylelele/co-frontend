import { SocketEvents } from "src/types/socket.types";

export const AppEvents: SocketEvents = {
  connection: "connection",
  redirect: "redirect",
};

export const AuthEvents: SocketEvents = {
  login: "auth:login",
  register: "auth:register",
};

export const DepositEvents: SocketEvents = {
  create: "deposit:create",
};

export const WithdrawEvents: SocketEvents = {
  create: "withdraw:create",
};

export const BalanceEvents: SocketEvents = {
  check: "balance:check",
};
