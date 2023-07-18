import http from "http";
import express from "express";
import bodyParser from "body-parser";
import { Socket } from "socket.io";
import { Server } from "socket.io";
import { isAuthed } from "./middlewares/authorization.middleware";
import { Redis } from "ioredis";
import { config } from "./confs/redis.config";
import { UserController } from "./controllers/user.controller";
import { UserRouter } from "./routers/user.routes";
import { socketEvents } from "./consts/app.consts";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);

const io = new Server(server);

const pub = new Redis(config);
const sub = new Redis(config);

const userController = new UserController(sub, pub);

const userRouter = new UserRouter(userController);
app.use(userRouter.init());

io.use(isAuthed);
io.engine.use(errorHandler);

io.on(socketEvents.connection, (socket: Socket) => {
  console.log("a user connected");

  socket.on(socketEvents.login, async (input) => {
    const response = await userController.login(input);
    socket.emit(socketEvents.login, response);
  });

  socket.on(socketEvents.register, async (input) => {
    const response = await userController.register(input);
    socket.emit(socketEvents.register, response);
  });
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
