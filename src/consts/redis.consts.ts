import { RedisChannels } from "src/types/app.types";

export const userChannels: RedisChannels = {
  auth: {
    login: "auth:login",
    register: "auth:register",
  },
  deposit: {
    create: "deposit:create",
    approve: "deposit:approve",
    execute: "deposit:execute",
  },
  withdraw: {
    create: "withdraw:create",
  },
  balance: {
    check: "balance:check",
  },
  error: {
    transaction: "transaction:error",
    auth: "auth:error",
  },
};
