import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SettingTypes } from "@/src/types/interface";

const initialCategoryState: SettingTypes = {
  id: "",
  name: "setting",
  userId: "",
  isReviewSoundOn: false,
  rightAnswerSoundSrc: "",
  wrongAnswerSoundSrc: "",
  isTextToSpeechOn: false,
  textToSpeechLang: "",
  isDictionaryOn: false,
  tour: { reviewTour: false, newItemTour: false, boxTour: false },
};

export const SettingStateSlice = createSlice({
  name: "settingState",
  initialState: initialCategoryState,
  reducers: {
    storedSettingReducer: (state, action: PayloadAction<SettingTypes>) => {
      return { ...state, ...action.payload };
    },
    textToSpeechReducer: (state) => {
      state.isTextToSpeechOn = !state.isTextToSpeechOn;
    },
    textToSpeechLangReducer: (state, action: PayloadAction<string>) => {
      state.textToSpeechLang = action.payload;
    },
    reviewSoundsReducer: (state, action: PayloadAction<boolean>) => {
      state.isReviewSoundOn = action.payload;
    },
    rightAnswerSoundSrcReducer: (state, action: PayloadAction<string>) => {
      state.rightAnswerSoundSrc = action.payload;
    },
    wrongAnswerSoundSrcReducer: (state, action: PayloadAction<string>) => {
      state.wrongAnswerSoundSrc = action.payload;
    },
    dictionaryReducer: (state, action: PayloadAction<boolean>) => {
      state.isDictionaryOn = action.payload;
    },
    tourReducer: (state, action: PayloadAction<any>) => {
      state.tour = {...state.tour,...action.payload};
    },
  },
});

export const {
  storedSettingReducer,
  textToSpeechReducer,
  textToSpeechLangReducer,
  reviewSoundsReducer,
  rightAnswerSoundSrcReducer,
  wrongAnswerSoundSrcReducer,
  dictionaryReducer,
  tourReducer,
} = SettingStateSlice.actions;

export default SettingStateSlice.reducer;
