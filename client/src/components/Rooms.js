import React, { useState } from "react";
import "./Rooms.css";

const Rooms = ({ selectedRoom, rooms, onRoomSelect }) => {
  

  return (
    <div className="Rooms">
      <ul className="room-list">
        <div className="rooms-header">Rooms</div>
        {rooms.map((room, index) => {
          return selectedRoom === room ? (
            <li key={index} className="selected-room">
              {room}
            </li>
          ) : (
            <li
              key={index}
              className="room-list-item"
              onClick={() => onRoomSelect(room)}
            >
              {room}
            </li>
          );
        })}
      </ul>      
    </div>
  );
};

export default Rooms;
