import React, { useEffect, useState } from "react";
import "./RoomItem.css";
import ReactHover from "react-hover";
import { Trigger } from "react-hover/dist/ReactHover";
import Hover from "react-hover/dist/lib/Hover";
import { render } from "react-dom";

const RoomItem = ({
  selectedRoomId,
  room,
  onRoomSelect,
  username,
  isSelected,
}) => {
  const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: -230,
    shiftY: 10,
  };

  const render = () => {
    return (
      <div
        onClick={() => !isSelected && onRoomSelect(room)}
        className={
          selectedRoomId === room.id ? "selected-room-item" : "room-item"
        }
      >
        <div className="room-id">{room.id}</div>
        <ReactHover options={optionsCursorTrueWithMargin}>
          <Trigger>
            <div className="show-users-icon">{room.users.length}</div>
          </Trigger>
          <Hover>
            <div className="room-users">
              <div>
                {selectedRoomId === room.id && (
                  <div className="main-user-item">{username}</div>
                )}
                {room.users.map(
                  (user, index) =>
                    username !== user.name && (
                      <div className="user-list-item" key={index}>
                        {user.name}
                      </div>
                    )
                )}
              </div>
            </div>
          </Hover>
        </ReactHover>
      </div>
    );
  };
  return <li className="room-list-item"> {render()}</li>;
};

export default RoomItem;
