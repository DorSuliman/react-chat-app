export const setUsers = (users) => {
  return {
    type: "SET_USERS",
    payload: users,
  };
};

export const setUserName = (userName) => {
  return {
    type: "SET_USERNAME",
    payload: userName,
  };
};

export const setSelectedContact = (contact) => {
  return {
    type: "SELECTED_CONTACT",
    payload: contact,
  };
};

export const showChat = (showChat) => {
  return {
    type: "SHOW_CHAT",
    payload: showChat,
  };
};
