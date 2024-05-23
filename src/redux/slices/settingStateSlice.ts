import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SettingTypes } from "@/src/types/interface";

const initialCategoryState: SettingTypes = {
  id: "",
  name: "setting",
  userId: "",
  selectAllCategories:false,
  isReviewSoundOn: false,
  rightAnswerSoundSrc: "",
  wrongAnswerSoundSrc: "",
  isTextToSpeechOn: false,
  textToSpeechLang:'',
  isDictionaryOn: false,
  isTourOn: false,
};

export const SettingStateSlice = createSlice({
  name: "settingState",
  initialState: initialCategoryState,
  reducers: {
    storedSettingReducer: (state, action: PayloadAction<SettingTypes>) => {
      return { ...state, ...action.payload };
    },
    selectAllCategoriesReducer: (state) => {
      state.selectAllCategories = !state.selectAllCategories;
    },
    textToSpeechReducer: (state) => {
      state.isTextToSpeechOn = !state.isTextToSpeechOn;
    },
    textToSpeechLangReducer: (state, action: PayloadAction<string>) => {
      state.textToSpeechLang = action.payload;
    },
    reviewSoundsReducer: (state) => {
      state.isReviewSoundOn = !state.isReviewSoundOn;
    },
    rightAnswerSoundSrcReducer: (state, action: PayloadAction<string>) => {
      state.rightAnswerSoundSrc = action.payload;
    },
    wrongAnswerSoundSrcReducer: (state, action: PayloadAction<string>) => {
      state.wrongAnswerSoundSrc = action.payload;
    },
    dictionaryReducer: (state) => {
      state.isDictionaryOn = !state.isDictionaryOn;
    },
    tourReducer: (state) => {
      state.isTourOn = !state.isTourOn;
    },
  },
});

export const {
  storedSettingReducer,
  selectAllCategoriesReducer,
  textToSpeechReducer,
  textToSpeechLangReducer,
  reviewSoundsReducer,
  rightAnswerSoundSrcReducer,
  wrongAnswerSoundSrcReducer,
  dictionaryReducer,
  tourReducer,
} = SettingStateSlice.actions;

export default SettingStateSlice.reducer;
