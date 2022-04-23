import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IForm } from "../../interfaces/form.interface";

export interface IGetForms {
  forms?: IForm[];
  isLoading?: boolean;
  hasError?: boolean;
  success?: boolean;
}

const initialState: IGetForms = {
  forms: undefined,
  isLoading: false,
  hasError: false,
  success: undefined,
};

const getFormsSlice = createSlice({
  name: "getForms",
  initialState,
  reducers: {
    getFormsError: (state, action) => {
      return { ...state, isLoading: false, hasError: true };
    },
    getForms: (state) => {
      return { ...state, isLoading: true };
    },
    getFormsSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        forms: action.payload.data,
      };
    },
  },
});

export const { getForms, getFormsError, getFormsSuccess } =
  getFormsSlice.actions;

export const getFormsSelector = (state: RootState) => state.getForms;

export default getFormsSlice.reducer;
