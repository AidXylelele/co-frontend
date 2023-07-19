import http from "http";
import express from "express";
import bodyParser from "body-parser";
import { config } from "./confs/redis.config";
import { Server } from "socket.io";
import { Redis } from "ioredis";
import { isAuthed } from "./middlewares/authorization.middleware";
import {
  AppEvents,
  AuthEvents,
  BalanceEvents,
  DepositEvents,
  WithdrawEvents,
} from "./consts/app.consts";
import { UserRouter } from "./routers/user.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { ExtendedSocket } from "./types/app.types";
import { UserController } from "./controllers/user.controller";
import { BalanceController } from "./controllers/balance.controllers";
import { TransactionController } from "./controllers/transaction.controller";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);

const io = new Server(server);

const pub = new Redis(config);
const sub = new Redis(config);

const userController = new UserController(sub, pub);
const transactionController = new TransactionController(sub, pub);
const balanceController = new BalanceController(sub, pub);

const userRouter = new UserRouter(userController);

app.use(userRouter.init());

io.use(isAuthed);
io.engine.use(errorHandler);

io.on(AppEvents.connection, (socket: ExtendedSocket) => {
  console.log("a user connected");

  socket.on(AuthEvents.login, async (input) => {
    const response = await userController.login(input);
    socket.emit(AuthEvents.login, response);
  });

  socket.on(AuthEvents.register, async (input) => {
    const response = await userController.register(input);
    socket.emit(AuthEvents.register, response);
  });

  socket.on(DepositEvents.create, async (input) => {
    const link = await transactionController.createDeposit(input);
    socket.emit(AppEvents.redirect, link);
  });

  socket.on(WithdrawEvents.create, async (input) => {
    await transactionController.createWithdraw(input);
  });

  socket.on(BalanceEvents.check, async (input) => {
    await balanceController.check(input);
  });
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
