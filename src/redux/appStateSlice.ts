import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateTypes } from "./interfaces";
import { itemTypes, userTypes } from "../types/interface";

const initialState: initialStateTypes = {
  user: {
    id: "",
    isAuth: false,
    avatar: "",
    username: "",
    name: "",
    isModerator: false,
    catagories: {},
    forReview: false,
    email: "",
    role: "",
    joinTime: "",
    loggedIn: false,
  },
  item: {
    id: "",
    title: "",
    body: "",
    catagory: "",
    reviews: {
      box:0,
      startedAt:0
    },
    createdAt: 0,
    startedAt: 0,
  },
  items: [],
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    userReducer: (state, action: PayloadAction<userTypes>) => {
      state.user = { ...state.user, ...action.payload };
    },
    logOutReducer: () => initialState,
    logInReducer: (state, action: PayloadAction<object>) => {
      state.user = { ...state.user, ...action.payload };
    },
    itemReducer: (state, action: PayloadAction<itemTypes>) => {
      state.item = { ...state.item, ...action.payload };
    },
    allItemsReducer: (state, action: PayloadAction<itemTypes[]>) => {
      console.log(action.payload);
      
      state.items = [...state.items, ... action.payload] ;
    },
    resetStateReducer: (state) => {
      state.item = initialState.item;
    },
  },
});

export const {
  userReducer,
  logOutReducer,
  logInReducer,
  itemReducer,
  allItemsReducer,
  resetStateReducer,
} = appStateSlice.actions;

export default appStateSlice.reducer;
