import { RedisChannels } from "src/types/redis.types";

export const userChannels: RedisChannels = {
  auth: {
    login: ":auth:login",
    register: ":auth:register",
  },
  balance: {
    check: ":balance:check",
  },
  error: {
    auth: ":auth:error",
  },
};

export const transactionChannels: RedisChannels = {
  deposit: {
    create: ":deposit:create",
    approve: ":deposit:approve",
    execute: ":deposit:execute",
  },
  withdraw: {
    create: ":withdraw:create",
  },
  error: {
    transaction: ":transaction:error",
  },
};
