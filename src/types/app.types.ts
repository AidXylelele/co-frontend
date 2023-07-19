import { Socket } from "socket.io";

export type DecodedData = {
  email: string;
};

export type ExtendedSocket = Socket & {
  user?: DecodedData;
};

export type SocketEvents = {
  [key: string]: string;
};

export type RedisChannels = {
  [key: string]: {
    [key: string]: string;
  };
};

export type CollectionControllers = {
  [key: string]: any;
};

export type RegExpCollection = {
  [key: string]: RegExp;
};
