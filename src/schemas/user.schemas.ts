import Joi from "joi";
import { regExps } from "src/consts/validation.consts";

export const registerSchema = Joi.object({
  email: Joi.string().regex(regExps.email).trim().required(),
  name: Joi.string().min(2).required(),
  password: Joi.string().regex(regExps.password).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().regex(regExps.email).required(),
  password: Joi.string().regex(regExps.password).required(),
});
