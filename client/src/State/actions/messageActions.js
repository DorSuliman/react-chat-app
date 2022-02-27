export const setMessages = (messages) => {
  return {
    type: "SET_MESSAGES",
    payload: messages,
  };
};

export const addMessage = (message) => {
  return {
    type: "ADD_MESSAGE",
    payload: message,
  };
};

export const setCurrentMessage = (message) => {
  return {
    type: "SET_CURRENT_MESSAGE",
    payload: message,
  };
};
