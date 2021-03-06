import React from "react";
import { useSelector } from "react-redux";
import "./Message.css";

const Message = ({ messageData }) => {
  const userName = useSelector((state) => state.userName);

  return (
    <div
      className="message"
      id={userName === messageData.author ? "you" : "other"}
    >
      <div>
        <div className="message-content">
          <div>
            <div id="author">
              {userName !== messageData.author && messageData.author}
            </div>
            <div className="message-text">{messageData.message}</div>
          </div>
          <div id="time">{messageData.time}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
