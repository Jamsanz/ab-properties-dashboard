import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IUser } from "../../interfaces/user.interface";

interface IPostUserState {
  user?: IUser;
  isLoading?: boolean;
  hasError?: boolean;
  success?: string;
}

const initialState: IPostUserState = {
  user: undefined,
  isLoading: false,
  hasError: false,
  success: undefined,
};

const postUserSlice = createSlice({
  name: "postUser",
  initialState,
  reducers: {
    postUser: (state) => ({ ...state, isLoading: true }),
    postUserSuccess: (state, action) => ({
      ...state,
      user: action.payload,
      isLoading: false,
    }),
    postUserError: (state) => ({ ...state, isLoading: false, hasError: true }),
  },
});

export const { postUser, postUserSuccess, postUserError } = postUserSlice.actions;
export const postusersSelector = (state: RootState) => state.postUser;
export default postUserSlice.reducer;
