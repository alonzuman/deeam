import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profile/profileSlice";
import chatsReducer from "./features/chats/chatsSlice";
import profilesReducer from "./features/profiles/profilesSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    profiles: profilesReducer,
    chats: chatsReducer,
  }
})

export default store
