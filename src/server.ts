import express from "express";
import http from "http";
import { Socket } from "socket.io";
import { Server } from "socket.io";
import { isValid } from "./middlewares/validation.middleware";
import { isAuthed } from "./middlewares/authorization.middleware";
import { Redis } from "ioredis";
import { config } from "./confs/redis.config";
import { UserController } from "./controllers/user.controller";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const pub = new Redis(config);
const sub = new Redis(config);

const userController = new UserController(sub, pub);

io.use(isValid);

io.use(isAuthed);

io.on("connection", (socket: Socket) => {
  console.log("a user connected");
  socket.on("login", async (input) => {
    const token = await userController.login(input);
    socket.emit("login", token);
  });
  socket.on("register", async (input) => {
    const token = await userController.register(input);
    socket.emit("register", token);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
