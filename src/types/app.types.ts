export type RegExpCollection = {
  [key: string]: RegExp;
};

export type RedisChannels = {
  [key: string]: string;
};

export type SocketEvents = RedisChannels;

export type DecodedData = {
  email: string;
};

export type CollectionControllers = {
  [key: string]: any;
};
