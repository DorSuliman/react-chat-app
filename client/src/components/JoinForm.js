import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPassword,
  setUserName,
  showChat,
} from "../State/actions/userActions";
import "./JoinForm.css";

const JoinForm = ({ socket }) => {
  const [showNoInputWarning, setShowNoInputWarning] = useState(false);
  const [showNameTakenWarning, setShowNameTakenWarning] = useState(false);
  const [showWrongPasswordWarning, setShowWrongPasswordWarning] =
    useState(false);

  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userName);
  const password = useSelector((state) => state.password);
  const users = useSelector((state) => state.allUsers);

  useEffect(() => {
    setShowNoInputWarning(false);
    setShowNameTakenWarning(false);
    setShowWrongPasswordWarning(false);
  }, [userName, password]);

  const userExists = () => {
    if (users.find((user) => user.name === userName.trim())) return true;
    return false;
  };

  const userOnline = () => {
    return users.find((user) => user.name === userName.trim() && user.isOnline)
      ? true
      : false;
  };

  const isCorrectPassword = () => {
    return users.find(
      (user) => user.name === userName.trim() && user.password === password
    )
      ? true
      : false;
  };

  const Join = async () => {
    if (userName.trim() !== "" && password !== "") {
      if (userExists()) {
        if (!userOnline()) {
          if (isCorrectPassword()) {
            socket.emit("join", userName.trim(), password);
            dispatch(showChat(true));
          } else setShowWrongPasswordWarning(true);
        } else setShowNameTakenWarning(true);
      } else {
        socket.emit("join", userName.trim(), password);
        dispatch(showChat(true));
      }
    } else setShowNoInputWarning(true);
  };

  return (
    <div className="login-page">
      <h1>Login / Register</h1>
      <input
        className="input-username"
        type="text"
        placeholder="Username..."
        value={userName}
        onChange={(e) => dispatch(setUserName(e.target.value))}
        maxLength={20}
      ></input>
      <input
        className="input-password"
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}
        maxLength={10}
      ></input>
      <button className="button-join" onClick={Join}>
        Join
      </button>
      <div className="warning">
        {showNoInputWarning && <div>Please enter your name and password</div>}
        {showNameTakenWarning && <div>Name already taken</div>}
        {showWrongPasswordWarning && <div>Incorrect Password</div>}
      </div>
    </div>
  );
};

export default JoinForm;
