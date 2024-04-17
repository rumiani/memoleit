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
  categoryNameEditable: false,
};

export const categoryStateSlice = createSlice({
  name: "categoryState",
  initialState: initialCategoryState,
  reducers: {
    categoriesReducer: (state, action: PayloadAction<categoryTypes[]>) => {
      state.categories = action.payload;
    },
    categoryNameReducer: (state, action: PayloadAction<string>) => {
      state.category = { ...state.category, name:action.payload}
    },
    categoryReducer: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.map((category: categoryTypes) =>
        category.name === action.payload
          ? { ...category, status: !category.status }
          : category
      );
    },
    categoryEditNameReducer: (state,action: PayloadAction<boolean>) => {
      state.categoryNameEditable = action.payload;
    },
  },
});

export const { categoryReducer, categoriesReducer, categoryEditNameReducer,categoryNameReducer } =
  categoryStateSlice.actions;

export default categoryStateSlice.reducer;
