const { validationConfig } = require("../consts/middlewares.config");

const isValid = (event, socket, next) => {
  try {
    const schema = validationConfig[event];

    if (!schema) {
      return next();
    }

    const { error } = schema.validate(socket.data);

    if (error) {
      throw new CustomError("Validation Error", "Invalid input");
    }

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isValid };
