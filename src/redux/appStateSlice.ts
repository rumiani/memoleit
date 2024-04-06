import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateTypes } from "./interfaces";
import { categoryTypes, itemTypes } from "../types/interface";

const initialState: initialStateTypes = {
  user: {
    id: "",
    isAuth: false,
    avatar: "",
    username: "",
    name: "",
    isModerator: false,
    categories: {},
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
    category: "",
    createdAt: 0,
    reviews: {
      box: 0,
      review: 0,
      lastReviewDate: 0,
    },
  },
  items: [],
  categories: [],
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
    categoriesReducer: (state, action: PayloadAction<categoryTypes[]>) => {
      console.log(action.payload);
      state.categories = action.payload;
    },
    updateCategoryReducer: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.map((category) =>
        category.name === action.payload
          ? { ...category, status: !category.status }
          : category
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
  categoriesReducer,
  updateCategoryReducer,
} = appStateSlice.actions;

export default appStateSlice.reducer;
