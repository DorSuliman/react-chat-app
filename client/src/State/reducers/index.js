import { combineReducers } from "redux";
import { currentMessageReducer, messageReducer } from "./messageReducer";
import { roomIdReducer, roomReducer, selectedRoomReducer } from "./roomReducer";
import {
  passwordReducer,
  selectedContactReducer,
  showChatReducer,
  userNameReducer,
  userReducer,
} from "./userReducer";

const reducers = combineReducers({
  showChat: showChatReducer,
  userName: userNameReducer,
  password: passwordReducer,
  allUsers: userReducer,
  allRooms: roomReducer,
  newRoomId: roomIdReducer,
  allMessages: messageReducer,
  currentMessage: currentMessageReducer,
  selectedContact: selectedContactReducer,
  selectedRoom: selectedRoomReducer,
});

export default reducers;
