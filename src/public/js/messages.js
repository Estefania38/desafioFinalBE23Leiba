const message = [];

io.on("connection", (socket) => {
  console.log(`User ${socket.id} Connection`);

  //Nombre del usuario
  let userName = "";
  // Mesaje de Coneccion
  socket.on("userConnection", (data) => {
    userName = data.user;
    message.push({
      id: socket.id,
      info: "connection",
      name: data.user,
      message: `${data.user} Connectado`,
      date: new Date().toTimeString(),
    });
    io.sockets.emit("userConnection", message);
  });
  // Mensaje de Mesaje enviado
  socket.on("userMessage", (data) => {
    message.push({
      id: socket.id,
      info: "message",
      name: userName,
      message: data.message,
      date: new Date().toTimeString(),
    });
    io.sockets.emit("userMessage", message);
  });
  //Mensage Usuario escribiendo
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});