import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialPdfStateTypes } from "../interfaces";

const initialState: initialPdfStateTypes = {
  pdf: {
    id: "",
    name: "",
    file: {
      lastModified: 0,
      name: "",
      size: 0,
      type: "",
      webkitRelativePath: "",
    },
    createdAt: 0,
  },
  pdfs: [],
};

export const userStateSlice = createSlice({
  name: "pdfState",
  initialState,
  reducers: {
    pdfReducer: (state, action: PayloadAction<any>) => {
      state.pdf = { ...state.pdf, ...action.payload };
    },
    allPdfsReducer: (state, action: PayloadAction<object>) => {
      state.pdfs = { ...state.pdfs, ...action.payload };
    },
  },
});

export const { pdfReducer, allPdfsReducer } = userStateSlice.actions;

export default userStateSlice.reducer;
