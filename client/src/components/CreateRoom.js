import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoomId } from "../State/actions/roomActions";
import "./CreateRoom.css";

const CreateRoom = ({ onAddRoom }) => {
  const [showCreate, setShowCreate] = useState(false);

  const dispatch = useDispatch();
  const newRoomId = useSelector((state) => state.newRoomId);

  const AddRoom = () => {
    if (newRoomId.trim() !== "") {
      const newRoom = {
        id: newRoomId.trim(),
        users: [],
      };
      onAddRoom(newRoom);
      dispatch(setRoomId(""));
      setShowCreate(false);
    }
  };

  return (
    <div className="CreateRoom">
      {!showCreate ? (
        <div>
          <button className="button-create" onClick={() => setShowCreate(true)}>
            Create Room
          </button>
        </div>
      ) : (
        <div>
          <div className="container-add">
            <input
              autoFocus
              className="input-create-room"
              placeholder="Room Id..."
              maxLength={20}
              value={newRoomId}
              onChange={(e) => {
                dispatch(setRoomId(e.target.value));
              }}
            ></input>
            <button className="button-submit-create" onClick={AddRoom}>
              Add
            </button>
          </div>
          <button
            className="button-cancel-create"
            onClick={() => setShowCreate(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
