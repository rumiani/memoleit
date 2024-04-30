import { createSlice } from "@reduxjs/toolkit";
import { initialSettingTypes } from "../interfaces";

const initialCategoryState: initialSettingTypes = {
  setting: {
    isSoundOn: false,
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
    dictionaryReducer: (state) => {
      state.setting.isDictionaryOn = !state.setting.isDictionaryOn;
    },
    tourReducer: (state) => {
      state.setting.isDictionaryOn = !state.setting.isTourOn;
    },
  },
});

export const { soundReducer, dictionaryReducer, tourReducer } =
  SettingStateSlice.actions;

export default SettingStateSlice.reducer;
