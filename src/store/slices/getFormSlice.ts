import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IForm } from "../../interfaces/form.interface";

export interface IGetForm {
  form?: IForm;
  isLoading?: boolean;
  hasError?: boolean;
  success?: boolean;
}

const initialState: IGetForm = {
  form: undefined,
  isLoading: false,
  hasError: false,
  success: undefined,
};

const getFormSlice = createSlice({
  name: "getForm",
  initialState,
  reducers: {
    getFormError: (state, action) => {
      return { ...state, isLoading: false, hasError: true };
    },
    getForm: (state) => {
      return { ...state, isLoading: true };
    },
    getFormSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        form: action.payload.data,
      };
    },
  },
});

export const { getForm, getFormError, getFormSuccess } =
  getFormSlice.actions;

export const getFormSelector = (state: RootState) => state.getForm;

export default getFormSlice.reducer;
