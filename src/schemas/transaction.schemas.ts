import Joi from "joi";
import { currenciesAcronyms } from "src/consts/validation.consts";

export const transactionSchema = Joi.object({
  currency: Joi.string()
    .valid(...currenciesAcronyms)
    .required(),
  total: Joi.alternatives().conditional("value", {
    is: Joi.number().required(),
    then: Joi.forbidden(),
    otherwise: Joi.number().min(1).required(),
  }),
  value: Joi.alternatives().conditional("total", {
    is: Joi.forbidden(),
    then: Joi.number().min(1).required(),
    otherwise: Joi.forbidden(),
  }),
});
