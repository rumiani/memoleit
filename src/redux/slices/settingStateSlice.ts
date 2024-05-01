import { createSlice } from "@reduxjs/toolkit";
import { initialSettingTypes } from "../interfaces";

const initialCategoryState: initialSettingTypes = {
  setting: {
    isSoundOn: false,
    isTextToSpeechOn:false,
    isDictionaryOn: false,
    isTourOn: false,
  },
};

export const SettingStateSlice = createSlice({
  name: "settingState",
  initialState: initialCategoryState,
  reducers: {
    soundReducer: (state) => {
      state.setting.isSoundOn = !state.setting.isSoundOn;
    },
    textToSpeechReducer: (state) => {
      state.setting.isTextToSpeechOn = !state.setting.isTextToSpeechOn;
    },
    dictionaryReducer: (state) => {
      state.setting.isDictionaryOn = !state.setting.isDictionaryOn;
    },
    tourReducer: (state) => {
      state.setting.isDictionaryOn = !state.setting.isTourOn;
    },
  },
});

export const { soundReducer,textToSpeechReducer, dictionaryReducer, tourReducer } =
  SettingStateSlice.actions;

export default SettingStateSlice.reducer;
