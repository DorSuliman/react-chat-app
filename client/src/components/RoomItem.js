import React from "react";
import "./RoomItem.css";
import RoomUsersDisplay from "./RoomUsersDisplay";

const RoomItem = ({ index, room, onRoomSelect, isSelected }) => {
  return (
    <li>
      <div
        onClick={() => !isSelected && onRoomSelect(room)}
        className={`${isSelected ? "selected-room-item" : "room-item"} ${
          index === 0 ? "top-room-item" : ""
        }`}
      >
        <div className="room-id">{room.id}</div>
        <RoomUsersDisplay room={room} isSelected={isSelected} />
      </div>
    </li>
  );
};

export default RoomItem;
