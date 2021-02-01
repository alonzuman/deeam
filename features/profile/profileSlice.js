import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";

const INITIAL_STATE = {
  profile: null,
  isFetching: true,
  isFetched: false,
  isUpdating: false,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: INITIAL_STATE,
  reducers: {
    isFetching: (state) => {
      state.isFetching = true;
    },
    isFetched: (state) => {
      state.isFetching = true;
    },
    isUpdating: (state) => {
      state.isUpdating = true;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.isUpdating = false;
      state.isFetching = false;
      state.isFetched = true;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.isUpdating = false;
      state.isFetching = false;
      state.isFetched = false;
    },
    addProfileSection: (state, action) => {
      state.profile.sections = action.payload;
      state.isUpdating = false;
      state.isFetching = false;
      state.isFetched = false;
    }
  }
})

export const { isUpdating, isFetching, isFetched, setProfile, clearProfile, addProfileSection } = profileSlice.actions

export const updateProfileAsync = (profile) => dispatch => {
  dispatch(isUpdating())

  db.collection('profiles').doc(profile.uid).set({
    ...profile
  }, { merge: true })
    .then(res => {
      dispatch(setProfile({
        ...profile
      }))
    })
    .catch(err => {
      console.log(err.message)
    })
}

export const setProfileAsync = (profile) => dispatch => {
  dispatch(isUpdating())

  db.collection('profiles').doc(profile?.uid).get()
    .then(snapshot => {
      if (snapshot.exists) {
        dispatch(setProfile({
          uid: snapshot.id,
          ...snapshot.data()
        }))
      } else {
        db.collection('profiles').doc(profile?.uid).set(profile, { merge: true })
          .then(res => {
            dispatch(setProfile(profile))
          })
      }
    })
    .catch(err => console.log(err.message))
}

export const addProfileSectionAsync = (uid, section) => dispatch => {
  dispatch(isUpdating())

  db.collection('profiles').doc(uid).collection('profileSections').add(section)
    .then(res => {
      dispatch(addProfileSection({
        id: res.id,
        ...section
      }))
    })
    .catch(err => {
      console.log(err.message)
    })
}

export default profileSlice.reducer;
