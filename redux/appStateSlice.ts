import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialStateTypes } from "./interfaces";

const initialState: initialStateTypes = {
  local: {
    catagories:{},
    items:[]
  },
  item:{
    id: '',
    title: '',
    description:'',
    subject: '',
    createdAt: '',
    learned: false,
    days:0,
    shouldReview:false
  }
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    itemReducer: (state, action: PayloadAction<object>) => {
      state.item = { ...state.item, ...action.payload };
    },
    resetitemReducer: (state) => {
      state.item = initialState.item;
    }
  },
});

export const { itemReducer, resetitemReducer } =
  appStateSlice.actions;

export default appStateSlice.reducer;
