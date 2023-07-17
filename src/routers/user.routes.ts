import { Router } from "express";
import { UserController } from "src/controllers/user.controller";
import { repsonseHandler } from "src/middlewares/response.middleware";
import { isValid } from "src/middlewares/validation.middleware";
import { loginSchema, registerSchema } from "src/schemas/user.schemas";

export class UserRouter {
  private controller: UserController;
  private router: Router;
  constructor(controller: UserController) {
    this.controller = controller;
    this.router = Router();
  }

  init() {
    this.addEndPoints();
    return this.router;
  }

  addEndPoints() {
    this.router.post(
      "/login",
      isValid(loginSchema),
      repsonseHandler(this.controller.login)
    );
    this.router.post(
      "/register",
      isValid(registerSchema),
      repsonseHandler(this.controller.register)
    );
  }
}
