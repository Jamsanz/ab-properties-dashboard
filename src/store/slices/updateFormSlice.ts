import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IForm } from "../../interfaces/form.interface";

export interface IupdateForm {
  form?: IForm;
  isLoading?: boolean;
  hasError?: boolean;
  success?: boolean;
}

const initialState: IupdateForm = {
  form: undefined,
  isLoading: false,
  hasError: false,
  success: undefined,
};

const updateFormSlice = createSlice({
  name: "updateForm",
  initialState,
  reducers: {
    updateFormError: (state, action) => {
      return { ...state, isLoading: false, hasError: true };
    },
    updateForm: (state) => {
      return { ...state, isLoading: true };
    },
    updateFormSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        form: action.payload.data,
      };
    },
  },
});

export const { updateForm, updateFormError, updateFormSuccess } =
  updateFormSlice.actions;

export const updateFormSelector = (state: RootState) => state.updateForm;

export default updateFormSlice.reducer;
