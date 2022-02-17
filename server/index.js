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

const updateAllClients = (socket) => {
  socket.emit("get_rooms", rooms);
  socket.emit("get_offline_users", offlineUsers);
  socket.emit("get_online_users", onlineUsers);
  socket.emit("get_private_messages", privateMessages);
  socket.emit("get_messages", messages);
};

io.on("connection", (socket) => {
  console.log("User connected :D ", socket.id);

  //Connection
  socket.on("join", (username) => {
    console.log("JOINING: id:", socket.id, "name: ", username);
    socket.username = username;
    const onlineUser = {
      id: socket.id,
      name: username,
    };
    offlineUsers = offlineUsers.filter((user) => user.name !== username);
    onlineUsers.push(onlineUser);
    socket.broadcast.emit("recieve_online_user", onlineUser);
    socket.broadcast.emit("remove_offline_user", onlineUser, offlineUsers);
    updateAllClients(socket);
    console.log(`${username} joined`);
  });
  socket.on("disconnect", () => {
    const offlineUser = {
      id: socket.id,
      name: socket.username,
    };
    offlineUsers.push(offlineUser);
    onlineUsers = onlineUsers.filter((user) => user.name !== offlineUser.name);
    socket.broadcast.emit("recieve_offline_user", offlineUser);
    socket.broadcast.emit("remove_online_user", offlineUser, onlineUsers);
    rooms.forEach((room) => {
      room.users = room.users.filter((user) => user.name !== socket.username);
    });
    console.log("User disconnected D: ", socket.id);
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
    rooms.forEach((room) => {
      if (room.id === toRoomId) {
        const user = { id: socket.id, name: username };
        if (!room.users.find((user) => user.name === username))
          room.users.push(user);
      }
      if (room.id === fromRoomId) {
        room.users = room.users.filter((user) => user.name !== username);
      }
    });
    io.sockets.emit("get_rooms", rooms);
  });
  socket.on("create_room", (newRoom) => {
    if (!rooms.find((room) => room.id === newRoom.id)) {
      rooms.push(newRoom);
      io.sockets.emit("get_new_room", newRoom);
    }
  });

  //Messages
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
