import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IUser } from "../../interfaces/user.interface";

export interface IAuthentication {
  user?: IUser,
  success?: string;
  isLoading?: boolean;
  hasError?: boolean;
}

const initialState: IAuthentication = {
  user: undefined,
  success: undefined,
  isLoading: false,
  hasError: false,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticate: (state) => ({ ...state, isLoading: true }),
    authenticationSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: "Successful",
      user: action.payload,
    }),
    authenticationError: (state) => ({
      ...state,
      isLoading: false,
      hasError: true,
    }),
  },
});

export const { authenticate, authenticationSuccess, authenticationError } =
  authenticationSlice.actions;
export const authenticationSelector = (state: RootState) =>
  state.authentication;
export default authenticationSlice.reducer;
