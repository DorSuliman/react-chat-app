import React, { useEffect } from "react";
import "./Chat.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";
import { addMessage, setCurrentMessage } from "../State/actions/messageActions";
import { useDispatch, useSelector } from "react-redux";

const Chat = ({ socket }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.allMessages);
  const currentMessage = useSelector((state) => state.currentMessage);
  const userName = useSelector((state) => state.userName);
  const selectedRoom = useSelector((state) => state.selectedRoom);
  const selectedContact = useSelector((state) => state.selectedContact);

  useEffect(() => {
    socket.on("recieve_message", (messageData) => {
      dispatch(addMessage(messageData));
    });
  }, []);

  const getCurrentTimeString = () => {
    let h = new Date(Date.now()).getHours();
    let m = new Date(Date.now()).getMinutes();
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    return `${h}:${m}`;
  };

  const sendMessage = () => {
    if (
      currentMessage.trim() !== "" &&
      (selectedRoom.id || selectedContact.name)
    ) {
      const MessgeData = {
        roomId: selectedRoom.id,
        contact: selectedContact,
        author: userName,
        message: currentMessage,
        time: getCurrentTimeString(),
      };
      socket.emit("send_message", MessgeData);
      dispatch(addMessage(MessgeData));
    }
    dispatch(setCurrentMessage(""));
  };
  return (
    <div className="Chat">
      <div className="chat-header">
        <h1>
          {selectedRoom.id ? `Room: ${selectedRoom.id}` : selectedContact.name}
        </h1>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {selectedRoom.id
            ? messages.map((messageData, index) => {
                if (messageData.roomId === selectedRoom.id)
                  return <Message key={index} messageData={messageData} />;
                return null;
              })
            : messages.map((messageData, index) => {
                if (
                  (messageData.author === selectedContact.name &&
                    messageData.contact.name === userName) ||
                  (messageData.author === userName &&
                    messageData.contact.name === selectedContact.name)
                )
                  return (
                    <Message
                      key={index}
                      messageData={messageData}
                    />
                  );
                return null;
              })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          className="input-message"
          value={currentMessage}
          type="text"
          placeholder="Message..."
          onChange={(e) => dispatch(setCurrentMessage(e.target.value))}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        ></input>
        <button className="button-send" onClick={sendMessage}>
          <i className="fas fa-share"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
