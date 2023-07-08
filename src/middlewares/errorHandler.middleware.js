const errorHandler = (error, socket) => {
  console.error(error.message);

  socket.emit("error", { message: error.message });
};

module.exports = { errorHandler };
