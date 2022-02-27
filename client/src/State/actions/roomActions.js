export const setRooms = (rooms) => {
  return {
    type: "SET_ROOMS",
    payload: rooms,
  };
};

export const setRoomId = (roomId) => {
  return {
    type: "SET_ROOMID",
    payload: roomId,
  };
};

export const setSelectedRoom = (room) => {
  return {
    type: "SELECTED_ROOM",
    payload: room,
  };
};
