const { registerSchema, loginSchema } = require("../schemas/user.schemas");

const publicEvents = ["login", "register"];

const validationConfig = {
  login: loginSchema,
  register: registerSchema,
};

module.exports = { publicEvents, validationConfig };
