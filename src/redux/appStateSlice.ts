import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateTypes } from "./interfaces";

const initialState: initialStateTypes = {
  user: {
    id: "",
    isAuth: false,
    avatar: "",
    username: "",
    name: "",
    isModerator: false,
    catagories: [],
    email: "",
    role: "",
    joinTime: "",
    loggedIn: false,
  },
  item: {
    id: "",
    title: "",
    body: "",
    createdAt: 0,
    learned: false,
    days: 0,
    shouldReview: false,
    length: 0,
    catagory: "",
    tags: [],
  },
  items: [],
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    userReducer: (state, action: PayloadAction<object>) => {
      state.user = { ...state.user, ...action.payload };
    },
    logOutReducer: () => initialState,
    logInReducer: (state, action: PayloadAction<object>) => {
      state.user = { ...state.user, ...action.payload };
    },
    itemReducer: (state, action: PayloadAction<object>) => {
      state.item = { ...state.item, ...action.payload };
    },
    allItemsReducer: (state, action: PayloadAction<object>) => {
      state.item = { ...state.item, ...action.payload };
    },
    resetStateReducer: (state) => {
      state.item = initialState.item;
    },
  },
});

export const { userReducer, logOutReducer, logInReducer,itemReducer, allItemsReducer,resetStateReducer } =
  appStateSlice.actions;

export default appStateSlice.reducer;
