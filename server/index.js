//npm install express nodemon socket.io cors

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");
const { Console } = require("console");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

var users = [];
var rooms = [];
var messages = [];

const updateAllClients = (socket) => {
  socket.emit("get_rooms", rooms);
  io.sockets.emit("get_users", users);
  socket.emit("get_messages", messages);
};

io.on("connection", (socket) => {
  console.log(socket.id, " connected");
  socket.emit("get_users", users);

  //Connection
  socket.on("join", (username) => {
    socket.username = username;
    const onlineUser = {
      id: socket.id,
      name: username,
      isOnline: true,
    };
    users = users.filter((user) => user.name !== username);
    users.push(onlineUser);
    updateAllClients(socket);
  });

  //Disconnection
  socket.on("disconnect", () => {
    const offlineUser = {
      id: socket.id,
      name: socket.username,
      isOnline: false,
    };
    users = users.filter((user) => user.name !== socket.username);
    users.push(offlineUser);
    socket.broadcast.emit("get_users", users);
    rooms.forEach((room) => {
      room.users = room.users.filter((user) => user.name !== socket.username);
    });
    console.log(socket.username, " has disconnected");
  });

  //Rooms
  socket.on("leave_room", (roomId, username) => {
    rooms.forEach((room) => {
      if (room.id === roomId) {
        room.users = room.users.filter((user) => user.name !== username);
      }
    });
    io.sockets.emit("get_rooms", rooms);
  });
  socket.on("room_selected", (fromRoomId, toRoomId, username) => {
    rooms.every((room) => {
      if (room.id === fromRoomId) {
        room.users = room.users.filter((user) => user.name !== username);
      }
      room.id === toRoomId &&
        !room.users.find((user) => user.name === username) &&
        room.users.push({ id: socket.id, name: username, isOnline: true });
      return true;
    });
    io.sockets.emit("get_rooms", rooms);
  });
  socket.on("create_room", (newRoom) => {
    if (!rooms.find((room) => room.id === newRoom.id)) {
      rooms.push(newRoom);
      io.sockets.emit("get_rooms", rooms);
    }
  });

  //Messages
  socket.on("send_message", (messageData) => {
    messages.push(messageData);
    socket.broadcast.emit("recieve_message", messageData);
    io.sockets.emit("get_messages", messages);
  });
});

server.listen(3001, () => {
  console.log("Server running!");
});
