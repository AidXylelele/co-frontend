import { Collection } from "./common.types";

export type RedisChannels = {
  [key: string]: Collection<string>;
};
