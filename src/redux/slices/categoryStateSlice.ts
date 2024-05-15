import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCategoryStateTypes } from "../interfaces";
import { CategoryTypes } from "../../types/interface";

const initialCategoryState: initialCategoryStateTypes = {
  category: {
    id: "",
    userId: "",
    name: "",
    status: 0,
    createdAt: 0,
  },
  categories: [],
  categoryNameEditable: "",
};

export const categoryStateSlice = createSlice({
  name: "categoryState",
  initialState: initialCategoryState,
  reducers: {
    categoriesReducer: (state, action: PayloadAction<CategoryTypes[]>) => {
      state.categories = action.payload;
    },
    categoryNameReducer: (state, action: PayloadAction<string>) => {
      state.category.name = action.payload;
    },
    categoryEditNameReducer: (state, action: PayloadAction<string>) => {
      state.categoryNameEditable = action.payload;
    },
  },
});

export const {
  categoriesReducer,
  categoryEditNameReducer,
  categoryNameReducer,
} = categoryStateSlice.actions;

export default categoryStateSlice.reducer;
