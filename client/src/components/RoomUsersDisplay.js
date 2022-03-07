import React from "react";
import ReactHover, { Hover, Trigger } from "react-hover/dist/ReactHover";
import { useSelector } from "react-redux";
import "./RoomUsersDisplay.css";

const RoomUsersDisplay = ({ room, isSelected }) => {
  const options = {
    followCursor: true,
    shiftX: -230,
    shiftY: 10,
  };

  const username = useSelector((state) => state.userName);

  return (
    <ReactHover options={options}>
      <Trigger>
        <div className="show-users-trigger">
          {room.users.length}
          <i className={`fas fa-user`}></i>
        </div>
      </Trigger>
      <Hover type="hover">
        <div className="room-users">
          <div>
            {isSelected && (
              <div
                className={
                  room.users.length > 1
                    ? "main-user-item"
                    : "only-main-user-list-item"
                }
              >
                {username}
              </div>
            )}
            {room.users.map(
              (user, index) =>
                username !== user.name && (
                  <div
                    className={
                      room.users.length > 1
                        ? "user-list-item"
                        : "only-user-list-item"
                    }
                    key={index}
                  >
                    {user.name}
                  </div>
                )
            )}
          </div>
        </div>
      </Hover>
    </ReactHover>
  );
};

export default RoomUsersDisplay;
