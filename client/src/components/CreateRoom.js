import React, { useState } from "react";
import "./CreateRoom.css";

const CreateRoom = ({ onAddRoom }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [newRoomId, setNewRoomId] = useState("");

  const AddRoom = () => {
    if (newRoomId.trim() !== "") {
      const newRoom = {
        id: newRoomId,
        users: [],
      };
      onAddRoom(newRoom);
      setNewRoomId("");
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
              className="input-create-room"
              placeholder="Room Id..."
              maxLength={20}
              value={newRoomId}
              onChange={(e) => {
                setNewRoomId(e.target.value);
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
