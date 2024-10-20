import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialEssayTypes } from "../interfaces";
import { EssayEvaluation } from "@/src/types/interface";

const initialState: initialEssayTypes = {
  essay: { topic: "", body: "", task: "one", type: "general" },
  essayResult: {
    taskAchievement: "",
    coherenceAndCohesion: "",
    lexicalResource: "",
    grammaticalRangeAndAccuracy: "",
    suggestions: "",
    score: 0,
    isRelatedToTopic: false,
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
    essayResultReducer: (state, action: PayloadAction<EssayEvaluation>) => {
      console.log(action.payload);
      
      state.essayResult = { ...state.essayResult, ...action.payload };
    },
  },
});

export const { essayFormDataReducer, essayResultReducer } =
  itemStateSlice.actions;

export default itemStateSlice.reducer;
