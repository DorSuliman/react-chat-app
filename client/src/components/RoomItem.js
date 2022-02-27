import React from "react";
import "./RoomItem.css";
import RoomUsersDisplay from "./RoomUsersDisplay";

const RoomItem = ({ index, room, onRoomSelect, isSelected }) => {
  const render = () => {
    return (
      <div
        onClick={() => !isSelected && onRoomSelect(room)}
        className={`${isSelected ? "selected-room-item" : "room-item"} ${
          index === 0 ? "top-room-item" : ""
        }`}
      >
        <div className="room-id">{room.id}</div>
        <RoomUsersDisplay room={room} isSelected={isSelected} />
      </div>
    );
  };
  return <li className="room-list-item"> {render()}</li>;
};

export default RoomItem;
