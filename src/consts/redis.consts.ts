import { RedisChannels } from "src/types/app.types";

export const userChannels: RedisChannels = {
  register: "auth:register",
  login: "auth:login",
};
