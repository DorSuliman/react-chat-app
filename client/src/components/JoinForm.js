import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, showChat } from "../State/actions/userActions";

const JoinForm = ({ socket }) => {
  const [showNoNameWarning, setShowNoNameWarning] = useState(false);
  const [showNameTakenWarning, setShowNameTakenWarning] = useState(false);

  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userName);
  const users = useSelector((state) => state.allUsers);

  useEffect(() => {
    setShowNoNameWarning(false);
    setShowNameTakenWarning(false);
  }, [userName]);

  const userExists = () => {
    if (users.find((user) => user.name === userName.trim() && user.isOnline)) {
      return true;
    }
    dispatch(showChat(true));
    return false;
  };

  const Join = async () => {
    dispatch(setUserName(userName.trim()));
    if (userName.trim() !== "") {
      if (!userExists()) socket.emit("join", userName.trim());
      else setShowNameTakenWarning(true);
    } else setShowNoNameWarning(true);
  };

  return (
    <div className="login-page">
      <h1>Join a room</h1>
      <input
        className="input-username"
        type="text"
        placeholder="Name..."
        value={userName}
        onChange={(e) => dispatch(setUserName(e.target.value))}
        maxLength={20}
      ></input>
      <button className="button-join" onClick={Join}>
        Join
      </button>
      <div className="warning">
        {showNoNameWarning && <div>Please enter your name</div>}
        {showNameTakenWarning && <div>Name already taken</div>}
      </div>
    </div>
  );
};

export default JoinForm;
