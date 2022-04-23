import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IForm } from "../../interfaces/form.interface";

export interface IpostForm {
  form?: IForm;
  isLoading?: boolean;
  hasError?: boolean;
  success?: boolean;
}

const initialState: IpostForm = {
  form: undefined,
  isLoading: false,
  hasError: false,
  success: undefined,
};

const postFormSlice = createSlice({
  name: "postForm",
  initialState,
  reducers: {
    postFormError: (state, action) => {
      return { ...state, isLoading: false, hasError: true };
    },
    postForm: (state) => {
      return { ...state, isLoading: true };
    },
    postFormSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        form: action.payload.data,
      };
    },
  },
});

export const { postForm, postFormError, postFormSuccess } = postFormSlice.actions;

export const postFormSelector = (state: RootState) => state.postForm;

export default postFormSlice.reducer;
