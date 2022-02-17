import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import ContactsList from "./components/ContactsList";
import JoinForm from "./components/JoinForm";
import RoomsList from "./components/RoomsList";
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
  const [selectedContact, setSelectedContact] = useState();

  useEffect(() => {
    addSockets();
  }, []);

  const addSockets = () => {
    //Users
    socket.on("get_online_users", (onlineUsers) => {
      setOnlineUsers(onlineUsers.filter((user) => user.id !== socket.id));
    });
    socket.on("get_offline_users", (offlineUsers) => {
      setOfflineUsers([...new Set(offlineUsers)]);
    });
    socket.on("recieve_online_user", (newUser) => {
      setOnlineUsers((users) => [...users, newUser]);
    });
    socket.on("recieve_offline_user", (newUser) => {
      setOfflineUsers((users) => [...users, newUser]);
    });
    socket.on("remove_online_user", (newUser, onlineUsers) => {
      setOnlineUsers(
        onlineUsers.filter(
          (user) => user.id !== newUser.id && user.id !== socket.id
        )
      );
    });
    socket.on("remove_offline_user", (newUser, offlineUsers) => {
      setOfflineUsers(offlineUsers.filter((user) => user.id !== newUser.id));
    });

    //Rooms
    socket.on("get_rooms", (rooms) => {
      setRooms([...rooms]);
    });
    socket.on("get_new_room", (newRoom) => {
      setRooms((rooms) => [...rooms, newRoom]);
    });

    //Messages
    socket.on("get_messages", (messages) => {
      setMessages(messages);
    });
    socket.on("get_private_messages", (privateMessages) => {
      setPrivateMessages(privateMessages);
    });
  };

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

  const handleRoomSelect = (selectedRoom) => {
    socket.emit("room_selected", roomId, selectedRoom.id, userName);
    setSelectedContact();
    setRoomId(selectedRoom.id);
  };

  const handleContactSelect = (contact) => {
    roomId && socket.emit("leave_room", roomId, userName);
    setSelectedContact(contact);
    setRoomId("");
  };

  const AddRoom = (newRoom) => {
    socket.emit("create_room", newRoom);
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
            <div className="contacts-header">Welcome {userName}!</div>
            <ContactsList
              onlineUsers={onlineUsers}
              offlineUsers={offlineUsers}
              onContactSelect={handleContactSelect}
              selectedContact={selectedContact}
              socket={socket}
            />
          </div>
          {(roomId || selectedContact) && (
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
          )}
          <div className="sidebar-rooms">
            <div className="sidebar">
              <RoomsList
                socket={socket}
                rooms={rooms}
                onRoomSelect={handleRoomSelect}
                selectedRoomId={roomId}
                username={userName}
              />
            </div>
            <CreateRoom onAddRoom={AddRoom}></CreateRoom>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
