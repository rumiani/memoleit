import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateTypes } from "./interfaces";

const initialState: initialStateTypes = {
  user: {
    isAuth: false,
    username: "",
    uid: "",
    isModerator: false,
    catagories: {},
    items: [],
  },
  item: {
    id: "",
    title: "",
    description: "",
    subject: "",
    createdAt: "",
    learned: false,
    days: 0,
    shouldReview: false,
  },
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    logOutReducer: () => initialState,
    logInReducer: (state, action: PayloadAction<object>) => {
      state.user = { ...state.user, ...action.payload };
    },
    itemReducer: (state, action: PayloadAction<object>) => {
      state.item = { ...state.item, ...action.payload };
    },
  },
});

export const { itemReducer, logInReducer, logOutReducer } =
  appStateSlice.actions;

export default appStateSlice.reducer;
