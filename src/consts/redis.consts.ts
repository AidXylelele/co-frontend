import { Channels } from "src/types/redis.types";

export const userChannels: Channels = {
  register: "auth:register",
  login: "auth:login",
};
