import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profile/profileSlice";
import matchesReducer from "./features/matches/matchesSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    matches: matchesReducer,
  }
})

export default store
