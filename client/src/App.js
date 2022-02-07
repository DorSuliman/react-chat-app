import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Contacts from "./components/Contacts";
import JoinForm from "./components/JoinForm";
import Rooms from "./components/Rooms";
import CreateRoom from "./components/CreateRoom";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});

  useEffect(() => {
    socket.on("get_online_users", (onlineUsers) => {
      setOnlineUsers(onlineUsers.filter((user) => user.id !== socket.id));
    });

    socket.on("get_offline_users", (offlineUsers) => {
      setOfflineUsers([...new Set(offlineUsers)]);
    });

    socket.on("get_rooms", (rooms) => {
      setRooms(rooms);
    });

    socket.on("get_new_room", (newRoomId) => {
      setRooms((rooms) => [...rooms, newRoomId]);
    });

    socket.on("get_messages", (messages) => {
      setMessages(messages);
    });

    socket.on("get_private_messages", (privateMessages) => {
      setPrivateMessages(privateMessages);
    });
  }, []);

  const handleUsernameCallback = (username) => {
    setUserName(username);
  };

  const handleJoin = () => {
    if (!onlineUsers.some((user) => user.name === userName)) {
      setShowChat(true);
      return true;
    }
    return false;
  };

  const handleRoomSelect = (newRoomId) => {
    setSelectedContact({});
    setRoomId(newRoomId);
    socket.emit("switch_room", roomId, newRoomId, userName);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setRoomId("");
  };

  const AddRoom = (newRoomId) => {
    if (!rooms.includes(newRoomId)) {
      setRooms((list) => [...list, newRoomId]);
      socket.emit("create_room", newRoomId);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <JoinForm
          socket={socket}
          handleUsername={handleUsernameCallback}
          onJoin={handleJoin}
          userName={userName}
        />
      ) : (
        <div className="container">
          <div className="sidebar">
            <Contacts
              username={userName}
              onlineUsers={onlineUsers}
              offlineUsers={offlineUsers}
              onContactSelect={handleContactSelect}
              selectedContact={selectedContact}
            />
          </div>
          <div className="chat">
            <Chat
              socket={socket}
              userName={userName}
              roomId={roomId}
              selectedContact={selectedContact}
              messages={messages}
              privateMessages={privateMessages}
            />
          </div>
          <div className="sidebar">
            <Rooms
              rooms={rooms}
              onRoomSelect={handleRoomSelect}
              selectedRoom={roomId}
            />
            <CreateRoom onAddRoom={AddRoom}></CreateRoom>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
