const initialUsers = [];

export const userReducer = (state = initialUsers, action) => {
  switch (action.type) {
    case "SET_USERS":
      return [...action.payload];
    default:
      return state;
  }
};

export const userNameReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return action.payload;
    default:
      return state;
  }
};

export const selectedContactReducer = (state = {}, action) => {
  switch (action.type) {
    case "SELECTED_CONTACT":
      return { ...action.payload };
    default:
      return state;
  }
};

export const showChatReducer = (state = false, action) => {
  switch (action.type) {
    case "SHOW_CHAT":
      return action.payload;
    default:
      return state;
  }
};
