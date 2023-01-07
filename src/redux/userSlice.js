import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    follow: (state, action) => {
      if (!state.currentUser.following.includes(action.payload)) {
        state.currentUser.following.push(action.payload);
        localStorage.setItem("user", JSON.stringify(state.currentUser));
      }
    },
    unfollow: (state, action) => {
      if (state.currentUser.following.includes(action.payload)) {
        state.currentUser.following.splice(
          state.currentUser.following.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
        localStorage.setItem("user", JSON.stringify(state.currentUser));
      }
    },
  },
});

export const {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
  subscription,
  follow,
  unfollow,
} = userSlice.actions;
export default userSlice.reducer;
