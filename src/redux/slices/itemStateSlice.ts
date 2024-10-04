import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialItemStateTypes } from "../interfaces";
import { ItemTypes, LookUpResultTypes } from "../../types/interface";

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
  translatingItems: {},
  numberOfItemsToReview: 0,
  generatedStory:""
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
      action: PayloadAction<{ [key: string]: string }>,
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    numberOfItemsToReviewReducer: (state, action: PayloadAction<number>) => {
      state.numberOfItemsToReview = action.payload;
    },

    translatingItemsReducer: (state, action: PayloadAction<string>) => {
      if (!state.translatingItems[action.payload])
        state.translatingItems[action.payload] = [];
    },
    definitionOfItemsReducer: (
      state,
      action: PayloadAction<{ [key: string]: LookUpResultTypes[] }>,
    ) => {
      state.translatingItems[Object.keys(action.payload)[0]] = Object.values(
        action.payload,
      )[0];
    },
    removeTranslationItemReducer: (state, action: PayloadAction<string>) => {
      const { [action.payload]: _, ...newTranslatingItems } = state.translatingItems;
      state.translatingItems = newTranslatingItems
    },
    generatedStoryReducer: (state, action: PayloadAction<string>) => {
      state.generatedStory = action.payload
    },
  },
});

export const {
  itemReducer,
  allItemsReducer,
  formDataReducer,
  numberOfItemsToReviewReducer,
  translatingItemsReducer,
  definitionOfItemsReducer,
  removeTranslationItemReducer,
  generatedStoryReducer
} = itemStateSlice.actions;

export default itemStateSlice.reducer;
