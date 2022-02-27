const initialRooms = [];

export const roomReducer = (state = initialRooms, action) => {
  switch (action.type) {
    case "SET_ROOMS":
      return [...action.payload];
    case "ADD_ROOM":
      return [...state, action.payload];
    default:
      return state;
  }
};

export const roomIdReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_ROOMID":
      return action.payload;
    default:
      return state;
  }
};

export const selectedRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case "SELECTED_ROOM":
      return { ...action.payload };
    default:
      return state;
  }
};
