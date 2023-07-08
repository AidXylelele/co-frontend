import { publicEvents } from "../consts/middlewares.config";
import { CustomError } from "../utils/customError.util";
const passport = require("passport");

const isAuthed = (socket, next) => {
  if (publicEvents.includes(socket)) {
    return next();
  }

  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      const error = new CustomError("Authentication Error", "Invalid Token");
      return next(error);
    }

    if (info && info.name === "TokenExpiredError") {
      const error = new CustomError("Authentication Error", "Expired Token");
      return next(error);
    }

    socket.user = user;
    next();
  })(socket, next);
};

module.exports = { isAuthed };
