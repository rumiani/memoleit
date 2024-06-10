import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialItemStateTypes } from "../interfaces";
import { ItemTypes } from "../../types/interface";
import { EditorState } from "draft-js";

const initialState: initialItemStateTypes = {
  item: {
    id: "",
    userId: "",
    categoryId: "",
    title: "",
    body: "",
    category: "",
    box: 1,
    createdAt: 0,
    lastReview: 0,
  },
  formData: {
    id: "",
    userId: "",
    categoryId: "",
    title: "",
    body: "",
    category: "",
    box: 1,
    createdAt: 0,
    lastReview: 0,
  },
  items: [],
  numberOfItemsToReview: 0,
};

export const itemStateSlice = createSlice({
  name: "itemState",
  initialState,
  reducers: {
    itemReducer: (state, action: PayloadAction<ItemTypes>) => {
      state.item = { ...action.payload };
    },
    allItemsReducer: (state, action: PayloadAction<ItemTypes[]>) => {
      state.items = [...action.payload];
    },
    formDataReducer: (
      state,
      action: PayloadAction<{ [key: string]: string | EditorState }>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    numberOfItemsToReviewReducer: (state, action: PayloadAction<number>) => {      
      state.numberOfItemsToReview = action.payload;
    },
  },
});

export const {
  itemReducer,
  allItemsReducer,
  formDataReducer,
  numberOfItemsToReviewReducer,
} = itemStateSlice.actions;

export default itemStateSlice.reducer;
