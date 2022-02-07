import React, { useEffect, useState } from "react";

const JoinForm = ({ socket, handleUsername, onJoin, userName }) => {
  const [showNoNameWarning, setShowNoNameWarning] = useState(false);
  const [showNameTakenWarning, setShowNameTakenWarning] = useState(false);

  useEffect(() => {
    setShowNoNameWarning(false);
    setShowNameTakenWarning(false);
  }, [userName]);

  const joinRoom = async () => {
    if (userName !== "") {
      if (onJoin()) socket.emit("join", userName);
      else setShowNameTakenWarning(true);
    }
    if (userName === "") setShowNoNameWarning(true);
  };

  return (
    <div className="login-page">
      <h1>Join a room</h1>
      <input
        className="input-username"
        type="text"
        placeholder="Name..."
        value={userName}
        onChange={(e) => handleUsername(e.target.value)}
        maxLength={20}
      ></input>
      <button className="button-join" onClick={joinRoom}>
        Join
      </button>
      {showNoNameWarning && (
        <div className="warning">Please enter your name</div>
      )}
      {showNameTakenWarning && (
        <div className="warning">Name already taken</div>
      )}
    </div>
  );
};

export default JoinForm;
