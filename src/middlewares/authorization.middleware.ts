import { SocketMiddleware } from "src/types/middlewares.types";
import { CustomError } from "../utils/customError.util";
import { DecodedData } from "src/types/app.types";

const passport = require("passport");

export const isAuthed: SocketMiddleware = (socket, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error | CustomError, user: DecodedData, info: any) => {
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
    }
  )(socket, next);
};
