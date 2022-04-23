import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IResponse } from "../../interfaces/response.interface";

export interface IGetResponses {
  responses?: IResponse[];
  isLoading?: boolean;
  hasError?: boolean;
  success?: boolean;
}

const initialState: IGetResponses = {
  responses: undefined,
  isLoading: false,
  hasError: false,
  success: undefined,
};

const getResponsesSlice = createSlice({
  name: "getResponses",
  initialState,
  reducers: {
    getResponsesError: (state, action) => {
      return { ...state, isLoading: false, hasError: true };
    },
    getResponses: (state) => {
      return { ...state, isLoading: true };
    },
    getResponsesSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        responses: action.payload.data,
      };
    },
  },
});

export const { getResponses, getResponsesError, getResponsesSuccess } =
  getResponsesSlice.actions;

export const getResponsesSelector = (state: RootState) => state.getResponses;

export default getResponsesSlice.reducer;
