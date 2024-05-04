import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialSettingTypes } from "../interfaces";
import { SettingTypes } from "@/src/types/interface";

const initialCategoryState: initialSettingTypes = {
  setting: {
    reviewSounds:{
      isSoundOn:false,
      right:0,
      wrong:0
    } ,
    isTextToSpeechOn:false,
    isDictionaryOn: false,
    isTourOn: false,
  },
};

export const SettingStateSlice = createSlice({
  name: "settingState",
  initialState: initialCategoryState,
  reducers: {
    reviewSoundsReducer: (state, action: PayloadAction<any>) => {            
      state.setting.reviewSounds = {...action.payload}
    },
    textToSpeechReducer: (state, action: PayloadAction<boolean>) => {
      state.setting.isTextToSpeechOn = action.payload
    },
    dictionaryReducer: (state) => {
      state.setting.isDictionaryOn = !state.setting.isDictionaryOn;
    },
    tourReducer: (state) => {
      state.setting.isDictionaryOn = !state.setting.isTourOn;
    },
  },
});

export const { reviewSoundsReducer,textToSpeechReducer, dictionaryReducer, tourReducer } =
  SettingStateSlice.actions;

export default SettingStateSlice.reducer;
