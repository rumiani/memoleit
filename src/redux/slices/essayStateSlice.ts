import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialEssayTypes } from "../interfaces";
import { EssayObjectTypes } from "@/src/types/interface";

const initialState: initialEssayTypes = {
  essay: { topic: "", body: "", task: "one", type: "general" },
  essayObject: {
    id: "",
    user: "",
    topic: "",
    body: "",
    type: "general",
    task: "one",
    properties: [],
    suggestions: "",
    score: "0",
    isRelatedToTopic: false,
    createdAt: 0,
  },
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
    essayObjectReducer: (state, action: PayloadAction<EssayObjectTypes>) => {
      state.essayObject = { ...state.essayObject, ...action.payload };
    },
  },
});

export const { essayFormDataReducer, essayObjectReducer } =
  itemStateSlice.actions;

export default itemStateSlice.reducer;
