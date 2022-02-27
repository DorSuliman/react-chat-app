import React from "react";
import { useSelector } from "react-redux";
import RoomItem from "./RoomItem";
import "./RoomsList.css";

const RoomsList = ({ onRoomSelect }) => {
  const rooms = useSelector((state) => state.allRooms);
  const selectedRoom = useSelector((state) => state.selectedRoom);

  return (
    <ul className="RoomsList">
      <div className="rooms-header">Rooms</div>
      {rooms.map((room, index) => {
        return (
          <RoomItem
            key={index}
            index={index}
            isSelected={selectedRoom.id === room.id}
            room={room}
            onRoomSelect={onRoomSelect}
          />
        );
      })}
    </ul>
  );
};

export default RoomsList;
