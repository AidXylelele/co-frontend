import { ObjectSchema } from "joi";
import { ExpressMiddleware } from "src/types/middlewares.types";
import { CustomError } from "src/utils/customError.util";

export const isValid =
  (schema: ObjectSchema): ExpressMiddleware =>
  (req, _res, next) => {
    try {
      const { error } = schema.validate(req.body);

      if (error) {
        throw new CustomError("Validation Error", "Invalid input");
      }

      return next();
    } catch (error) {
      next(error);
    }
  };
