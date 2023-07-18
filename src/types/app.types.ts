export type RegExpCollection = {
  [key: string]: RegExp;
};

export type RedisChannels = {
  [key: string]: {
    [key: string]: string;
  };
};

export type SocketEvents = {
  [key: string]: string;
};

export type DecodedData = {
  email: string;
};

export type CollectionControllers = {
  [key: string]: any;
};
