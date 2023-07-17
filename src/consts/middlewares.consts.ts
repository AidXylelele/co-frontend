import { EventsList, SchemasCollection } from "src/types/consts.types";
const { registerSchema, loginSchema } = require("../schemas/user.schemas");

export const publicEvents: EventsList = ["login", "register"];

export const validationConfig: SchemasCollection = {
  login: loginSchema,
  register: registerSchema,
};
