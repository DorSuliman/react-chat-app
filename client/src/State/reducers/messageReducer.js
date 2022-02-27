const initialMessages = [];

export const messageReducer = (state = initialMessages, action) => {
  switch (action.type) {
    case "SET_MESSAGES":
      return [...action.payload];
    case "ADD_MESSAGE":
      return [...state, action.payload];
    default:
      return state;
  }
};

export const currentMessageReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_CURRENT_MESSAGE":
      return action.payload;
    default:
      return state;
  }
};
