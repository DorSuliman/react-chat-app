import React, { useEffect, useState } from "react";
import "./Chat.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

const Chat = ({
  socket,
  userName,
  roomId,
  selectedContact,
  messages,
  privateMessages,
}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState(messages);
  const [privateMessageList, setPrivateMessageList] = useState(privateMessages);

  useEffect(() => {
    socket.on("recieve_message", (messgeData) => {
      setMessageList((list) => [...list, messgeData]);
    });

    socket.on("recieve_private_message", (messgeData) => {
      setPrivateMessageList((list) => [...list, messgeData]);
    });
  }, []);

  const sendMessage = () => {
    if (currentMessage !== "" && (roomId || selectedContact)) {
      const MessgeData = {
        roomId: roomId,
        contact: selectedContact,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      if (roomId) {
        socket.emit("send_message", MessgeData);
        setMessageList((list) => [...list, MessgeData]);
      } else if (Object.keys(selectedContact).length !== 0) {
        socket.emit("send_private_message", MessgeData);
        setPrivateMessageList((list) => [...list, MessgeData]);
      }
    }
    setCurrentMessage("");
  };
  return (
    <div className="Chat">
      <div className="chat-header">
        <h1>{roomId ? `Room: ${roomId}` : selectedContact.name}</h1>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {roomId
            ? messageList.map((messageData, index) => {
                if (messageData.roomId === roomId)
                  return (
                    <Message
                      key={index}
                      messageData={messageData}
                      userName={userName}
                    />
                  );
                return null;
              })
            : privateMessageList.map((messageData, index) => {
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
                      userName={userName}
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
          placeholder="Hey..."
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        ></input>
        <button className="button-send" onClick={sendMessage}>
          &#10148;
        </button>
      </div>
    </div>
  );
};

export default Chat;
