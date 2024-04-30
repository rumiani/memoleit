import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialItemsStateTypes } from "../interfaces";
import { ItemTypes } from "../../types/interface";

const initialState: initialItemsStateTypes = {
  item: {
    id: "",
    url: "",
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
};

export const itemStateSlice = createSlice({
  name: "itemState",
  initialState,
  reducers: {
    itemReducer: (state, action: PayloadAction<ItemTypes | undefined>) => {
      action.payload
        ? (state.item = { ...state.item, ...action.payload })
        : (state.item = initialState.item);
    },
    allItemsReducer: (state, action: PayloadAction<ItemTypes[]>) => {
      state.items = [...action.payload];
    },
    resetStateReducer: (state) => {
      state.item = initialState.item;
    },
  },
});

export const { itemReducer, allItemsReducer, resetStateReducer } =
itemStateSlice.actions;

export default itemStateSlice.reducer;
