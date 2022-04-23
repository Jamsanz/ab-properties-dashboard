import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IResponse } from "../../interfaces/response.interface";

export interface IGetResponse {
  response?: IResponse;
  isLoading?: boolean;
  hasError?: boolean;
  success?: boolean;
}

const initialState: IGetResponse = {
  response: undefined,
  isLoading: false,
  hasError: false,
  success: undefined,
};

const getResponseSlice = createSlice({
  name: "getResponse",
  initialState,
  reducers: {
    getResponseError: (state, action) => {
      return { ...state, isLoading: false, hasError: true };
    },
    getResponse: (state) => {
      return { ...state, isLoading: true };
    },
    getResponseSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        response: action.payload.data,
      };
    },
  },
});

export const { getResponse, getResponseError, getResponseSuccess } =
  getResponseSlice.actions;

export const getResponseSelector = (state: RootState) => state.getResponse;

export default getResponseSlice.reducer;
