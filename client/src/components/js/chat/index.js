const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const port = process.env.PORT || 8080;

app.use(cors());


server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

io.on("connection", (socket) => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);

  socket.on("send_message", (obj) => {
    console.log(obj)
    socket.broadcast.emit("get_message", obj)
  });


  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});