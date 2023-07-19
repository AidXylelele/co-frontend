import { Router } from "express";
import { repsonseHandler } from "src/middlewares/response.middleware";
import { TransactionController } from "src/controllers/transaction.controller";

export class TransactionRouter {
  private controller: TransactionController;
  private router: Router;
  constructor(controller: TransactionController) {
    this.controller = controller;
    this.router = Router();
  }

  init() {
    this.addEndPoints();
    return this.router;
  }

  addEndPoints() {
    this.router.get(
      "/approved",
      repsonseHandler(this.controller.executeDeposit)
    );
  }
}
