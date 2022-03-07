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

const updateClients = (socket) => {
  io.sockets.emit("get_users", users);
  socket.emit("get_rooms", rooms);
  socket.emit("get_messages", messages);
};

io.on("connection", (socket) => {
  socket.emit("get_users", users);
  
  //Connection
  socket.on("join", (username, password) => {
    socket.username = username;
    socket.password = password;
    const onlineUser = {
      id: socket.id,
      name: username,
      password: password,
      isOnline: true,
    };
    users = users.filter((user) => user.name !== username);
    users.push(onlineUser);
    updateClients(socket);
  });

  //Disconnection
  socket.on("disconnect", () => {
    users.map((user) => {
      if (user.id === socket.id) user.isOnline = false;
    });
    rooms.map((room) => {
      room.users = room.users.filter((user) => user.id !== socket.id);
    });
    socket.broadcast.emit("get_users", users);
    socket.broadcast.emit("get_rooms", rooms);
  });

  //Rooms
  socket.on("leave_room", (roomId) => {
    rooms.map((room) => {
      if (room.id === roomId) {
        room.users = room.users.filter((user) => user.id !== socket.id);
      }
    });
    io.sockets.emit("get_rooms", rooms);
  });
  socket.on("room_selected", (fromRoomId, toRoomId) => {
    rooms.map((room) => {
      if (room.id === fromRoomId) {
        room.users = room.users.filter((user) => user.id !== socket.id);
      }
      if (room.id === toRoomId) {
        room.users.push(users.find((user) => user.id === socket.id));
      }
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
