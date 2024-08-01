import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCategoryStateTypes } from "../interfaces";
import { CategoryTypes } from "../../types/interface";

const initialCategoryState: initialCategoryStateTypes = {
  category: {
    id: "",
    userId: "",
    name: "",
    status: false,
    createdAt: 0,
  },
  categories: [],
  categoryOnEdit: "",
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
    categoryOnEditReducer: (state, action: PayloadAction<string>) => {
      state.categoryOnEdit = action.payload;
    },
  },
});

export const { categoriesReducer, categoryReducer, categoryOnEditReducer } =
  categoryStateSlice.actions;

export default categoryStateSlice.reducer;
