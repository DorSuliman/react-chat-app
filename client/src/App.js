import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import ContactsList from "./components/ContactsList";
import JoinForm from "./components/JoinForm";
import RoomsList from "./components/RoomsList";
import CreateRoom from "./components/CreateRoom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedContact, setUsers } from "./State/actions/userActions";
import { setRooms, setSelectedRoom } from "./State/actions/roomActions";
import { setMessages } from "./State/actions/messageActions";

const socket = io.connect("http://localhost:3001");

function App() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userName);
  const showChat = useSelector((state) => state.showChat);
  const selectedRoom = useSelector((state) => state.selectedRoom);
  const selectedContact = useSelector((state) => state.selectedContact);

  useEffect(() => {
    addSocketEvents();
  }, []);

  const addSocketEvents = () => {
    socket.on("get_users", (users) => {
      dispatch(setUsers(users.filter((user) => user.id !== socket.id)));
    });

    socket.on("get_rooms", (rooms) => {
      dispatch(setRooms([...rooms]));
    });

    socket.on("get_messages", (messages) => {
      dispatch(setMessages(messages));
    });
  };

  const handleRoomSelect = (room) => {
    socket.emit("room_selected", selectedRoom.id, room.id, userName);
    selectedContact.name && dispatch(setSelectedContact());
    dispatch(setSelectedRoom(room));
  };

  const handleContactSelect = (contact) => {
    if (selectedRoom.id) {
      socket.emit("leave_room", selectedRoom.id, userName);
      dispatch(setSelectedRoom());
    }
    dispatch(setSelectedContact(contact));
  };

  const AddRoom = (newRoom) => {
    socket.emit("create_room", newRoom);
    handleRoomSelect(newRoom);
  };

  return (
    <div className="App">
      {!showChat ? (
        <JoinForm socket={socket} />
      ) : (
        <div className="container">
          <div className="sidebar">
            <div className="contacts-header">Welcome {userName}!</div>
            <ContactsList onContactSelect={handleContactSelect} />
          </div>
          {(selectedRoom.id || selectedContact.name) && (
            <div className="chat">
              <Chat socket={socket} />
            </div>
          )}
          <div className="sidebar-rooms">
            <div className="sidebar">
              <RoomsList onRoomSelect={handleRoomSelect} />
            </div>
            <CreateRoom onAddRoom={AddRoom}></CreateRoom>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
