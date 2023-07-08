import Joi from "joi";
import { regExps } from "../consts/regExps";

const registerSchema = Joi.object({
  email: Joi.string().regex(regExps.email).trim().required(),
  name: Joi.string().min(2).required(),
  password: Joi.string().regex(regExps.password).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().regex(regExps.email).required(),
  password: Joi.string().regex(regExps.password).required(),
});

module.exports = { registerSchema, loginSchema };
