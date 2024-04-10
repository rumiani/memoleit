import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCategoryStateTypes } from "./interfaces";
import { categoryTypes } from "../types/interface";

const initialCategoryState: initialCategoryStateTypes = {
  category: {
    id: "",
    name: "",
    status: false,
    createdAt: 0,
  },
  categories: [],
};

export const categoryStateSlice = createSlice({
  name: "categoryState",
  initialState: initialCategoryState,
  reducers: {
    categoriesReducer: (state, action: PayloadAction<categoryTypes[]>) => {
      state.categories = action.payload;
    },
    categoryReducer: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.map((category: categoryTypes) =>
        category.name === action.payload
          ? { ...category, status: !category.status }
          : category
      );
    },
  },
});

export const { categoryReducer, categoriesReducer } =
  categoryStateSlice.actions;

export default categoryStateSlice.reducer;
