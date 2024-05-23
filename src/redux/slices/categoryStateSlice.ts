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
};

export const categoryStateSlice = createSlice({
  name: "categoryState",
  initialState: initialCategoryState,
  reducers: {
    categoryReducer: (state, action: PayloadAction<CategoryTypes>) => {
      state.category = action.payload;
    },
    categoriesReducer: (state, action: PayloadAction<CategoryTypes[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { categoriesReducer, categoryReducer } =
  categoryStateSlice.actions;

export default categoryStateSlice.reducer;
