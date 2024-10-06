import { configureStore } from "@reduxjs/toolkit";
import categoryStateSlice from "./slices/categoryStateSlice";
import settingStateSlice from "./slices/settingStateSlice";
import itemStateSlice from "./slices/itemStateSlice";
import userStateSlice from "./slices/userStateSlice";
import pdfStateSlice from "./slices/pdfStateSlice";
import essayStateSlice from "./slices/essayStateSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userState: userStateSlice,
      itemState: itemStateSlice,
      categoryState: categoryStateSlice,
      settingState: settingStateSlice,
      pdfState: pdfStateSlice,
      essayState:essayStateSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
