import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialPdfStateTypes } from "../interfaces";
import { PdfStateTypes } from "@/src/types/interface";

const initialState: initialPdfStateTypes = {
  pdf: {
    id: "",
    name: "",
    pdfName:"",
    url:"",
    size:0,
    createdAt: 0,
  },
  pdfs: [],
};

export const userStateSlice = createSlice({
  name: "pdfState",
  initialState,
  reducers: {
    pdfReducer: (state, action: PayloadAction<PdfStateTypes>) => {
      state.pdf = { ...state.pdf, ...action.payload };
    },
    allPdfsReducer: (state, action: PayloadAction<PdfStateTypes[]>) => {
      state.pdfs = [...action.payload];
    },
  },
});

export const { pdfReducer, allPdfsReducer } = userStateSlice.actions;

export default userStateSlice.reducer;
