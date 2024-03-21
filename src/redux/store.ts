import { configureStore } from "@reduxjs/toolkit";
import appStateReducer from "./appStateSlice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
