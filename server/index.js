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

var onlineUsers = [];
var offlineUsers = [];
var rooms = [];
var messages = [];
var privateMessages = [];

const updateAllClients = () => {
  io.sockets.emit("get_rooms", rooms);
  io.sockets.emit("get_offline_users", offlineUsers);
  io.sockets.emit("get_online_users", onlineUsers);
  io.sockets.emit("get_private_messages", privateMessages);
  io.sockets.emit("get_messages", messages);
};

io.on("connection", (socket) => {
  console.log("User connected :D ", socket.id);
  socket.emit("get_offline_users", offlineUsers);
  socket.emit("get_online_users", onlineUsers);
  socket.emit("get_private_messages", privateMessages);
  socket.emit("get_messages", messages);
  socket.emit("get_rooms", rooms);

  socket.on("join", (username) => {
    console.log("JOINING: id:", socket.id, "name: ", username);
    socket.username = username;
    const newUser = {
      id: socket.id,
      name: username,
      isOnline: true,
    };
    offlineUsers = offlineUsers.filter((user) => user.name !== username);
    onlineUsers.push(newUser);
    socket.broadcast.emit("recieve_new_user", newUser);
    updateAllClients();
    console.log(`${username} joined`);
  });

  socket.on("disconnect", () => {
    const offlineUser = {
      id: socket.id,
      name: socket.username,
      isOnline: false,
    };
    offlineUsers.push(offlineUser);
    onlineUsers = onlineUsers.filter((user) => user.name !== socket.username);
    socket.broadcast.emit("get_offline_users", offlineUsers);
    socket.broadcast.emit("get_online_users", onlineUsers);
    console.log("User disconnected D: ", socket.id);
  });

  socket.on("switch_room", (from, to, username) => {
    socket.leave(from);
    socket.join(to);
    console.log(`${username} moved from ${from} to ${to}`);
  });

  socket.on("create_room", (newRoomId) => {
    rooms.push(newRoomId);
    socket.broadcast.emit("get_new_room", newRoomId);
  });

  socket.on("send_message", (messageData) => {
    messages.push(messageData);
    socket.broadcast.emit("get_messages", messages);
    socket.broadcast.emit("recieve_message", messageData);
  });

  socket.on("send_private_message", (messageData) => {
    privateMessages.push(messageData);
    io.to(messageData.contact.id).emit("get_private_messages", privateMessages);
    io.to(messageData.contact.id).emit("recieve_private_message", messageData);
  });
});

server.listen(3001, () => {
  console.log("Server running!");
});
