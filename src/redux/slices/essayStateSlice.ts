import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialEssayTypes } from "../interfaces";

const initialState: initialEssayTypes = {
  essay: { topic: "", body: "", task: "one", type: "general" },
  essayResult: "",
};

export const itemStateSlice = createSlice({
  name: "essayState",
  initialState,
  reducers: {
    essayFormDataReducer: (
      state,
      action: PayloadAction<{ [key: string]: string }>,
    ) => {
      state.essay = { ...state.essay, ...action.payload };
    },
    essayResultReducer: (state, action: PayloadAction<string>) => {
      state.essayResult = action.payload;
    },
  },
});

export const { essayFormDataReducer, essayResultReducer } =
  itemStateSlice.actions;

export default itemStateSlice.reducer;
