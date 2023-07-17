import Joi from "joi";

export type RegExps = {
  [key: string]: RegExp;
};

export type EventsList = string[];

export type SchemasCollection = {
  [key: string]: Joi.ObjectSchema<any>;
};
