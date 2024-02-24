import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CatFactType {
  id?: string;
  imageSrc?: string;
  fact?: string;
  length?: string;
}

export interface CatFactTypeState {
  catFactsAppData: CatFactType[];
}

const initialState: CatFactTypeState = {
  catFactsAppData: [],
};

export const CatFactAppDataSlice = createSlice({
  name: "catFactAppData",
  initialState,
  reducers: {
    setCatFactsAppData: (
      state: CatFactTypeState,
      action: PayloadAction<CatFactType[]>
    ) => {
      state.catFactsAppData = action.payload;
    }
  },
});

export const { setCatFactsAppData } = CatFactAppDataSlice.actions;

export const selectCatFactsAppData = (state: RootState) => state.catFactsAppData;

export const catFactsAppDataReducer = CatFactAppDataSlice.reducer;
