import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialUserStateTypes } from "../interfaces";

const initialState: initialUserStateTypes = {
  user: {
    id: "",
    isAuth: false,
    avatar: "",
    username: "",
    name: "",
    isModerator: false,
    email: "",
    role: "",
    joinTime: "",
    isLoggedIn: false,
  },
};

export const userStateSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    userReducer: (state, action: PayloadAction<any>) => {
      state.user = { ...state.user, ...action.payload };
    },
    logOutReducer: () => initialState,
    logInReducer: (state, action: PayloadAction<object>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { userReducer, logOutReducer, logInReducer } =
  userStateSlice.actions;

export default userStateSlice.reducer;
