import React from "react";
import RoomItem from "./RoomItem";
import "./RoomsList.css";

const RoomsList = ({
  socket,
  selectedRoomId,
  rooms,
  onRoomSelect,
  username,
}) => {
  return (
    <ul className="RoomsList">
      <div className="rooms-header">Rooms</div>
      {rooms.map((room, index) => {
        return (
          <RoomItem
            key={index}
            isSelected={selectedRoomId === room.id}
            selectedRoomId={selectedRoomId}
            room={room}
            onRoomSelect={onRoomSelect}
            username={username}
            socket={socket}
          />
        );
      })}
    </ul>
  );
};

export default RoomsList;
