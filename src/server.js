const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { isValid } = require("./middlewares/validation.middleware");
const { isAuthed } = require("./middlewares/authorization.middleware");
const { Redis } = require("ioredis");
const { config } = require("./confs/redis.config");

const io = new Server(server);

const pub = new Redis(config);
const sub = new Redis(config);

const userService = new UserService(pub, sub);

io.use(isValid);

io.use(isAuthed);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("login", async (message) => {});
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
