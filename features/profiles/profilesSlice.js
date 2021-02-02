import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { mapDocs } from "../../utils/functions";

const INITIAL_STATE = {
  isFetching: false,
  isFetched: false,
  isUpdating: false,
  profiles: {
    all: [],
    currentProfile: {}
  }
}

const profilesSlice = createSlice({
  name: 'profiles',
  initialState: INITIAL_STATE,
  reducers: {
    isFetching: (state) => {
      state.isFetching = true;
    },
    isUpdating: (state) => {
      state.isUpdating = true;
    },
    setProfiles: (state, action) => {
      // Will not be iterable because fetch of profiles will be in batches of 20's
      state.profiles.all = action.payload
      // state.profiles.all.push(...action.payload)
      state.isFetching = false
      state.isUpdating = false
      state.isFetched = true
    },
    setCurrentProfile: (state, action) => {
      state.profiles.currentProfile = action.payload
      state.isFetching = false
      state.isUpdating = false
      state.isFetched = true
    },
    clearProfiles: (state) => INITIAL_STATE
  }
})

export const { isFetching, isFetched, isUpdating, setProfiles, setCurrentProfile, clearProfiles } = profilesSlice.actions

export const setProfilesAsync = () => dispatch => {
  dispatch(isFetching())
  // TODO here is where the query will be building up based on the users preferences
  db
    .collection('profiles')
    .get()
    .then(snapshot => {
      const data = mapDocs(snapshot, 'uid')
      dispatch(setProfiles(data))
    })
    .catch(err => alert(err.message))
}

export const setCurrentProfileAsync = (uid) => dispatch => {
  dispatch(isFetching())

  db.collection('profiles').doc(uid).get()
    .then(snapshot => {
      const data = {
        uid: snapshot.uid,
        ...snapshot.data()
      }
      dispatch(setCurrentProfile(data))
    })
    .catch(err => alert(err.message))
}

export default profilesSlice.reducer;
