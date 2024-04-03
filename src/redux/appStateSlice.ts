import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateTypes } from "./interfaces";
import { catagoryTypes, itemTypes } from "../types/interface";

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
    createdAt: 0,
    reviews: {
      box: 0,
      review: 0,
      lastReviewDate: 0,
    },
  },
  items: [],
  catagories: [],
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    userReducer: (state, action: PayloadAction<any>) => {
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
      state.items = [...action.payload];
    },
    catagoriesReducer: (state, action: PayloadAction<catagoryTypes[]>) => {
      console.log(action.payload);
      state.catagories = action.payload;
    },
    updateCatagoryReducer: (state, action: PayloadAction<string>) => {
      state.catagories = state.catagories.map((catagory) =>
        catagory.name === action.payload
          ? { ...catagory, status: !catagory.status }
          : catagory
      );
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
  catagoriesReducer,
  updateCatagoryReducer,
} = appStateSlice.actions;

export default appStateSlice.reducer;
