import { Collection } from "./common.types";

export type SocketEvents = Collection<string>;

export type RedisChannels = {
  [key: string]: Collection<string>;
};
