import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IUser } from "../../interfaces/user.interface";

interface IUserState {
  user?: IUser[];
  isLoading?: boolean;
  hasError?: boolean;
  success?: string;
}

const initialState: IUserState = {
  user: undefined,
  isLoading: false,
  hasError: false,
  success: undefined,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state) => ({ ...state, isLoading: true }),
    getUsersSuccess: (state, action) => ({
      ...state,
      user: action.payload,
      isLoading: false,
    }),
    getUsersError: (state) => ({ ...state, isLoading: false, hasError: true }),
  },
});

export const { getUsers, getUsersSuccess, getUsersError } = usersSlice.actions;
export const usersSelector = (state: RootState) => state.users;
export default usersSlice.reducer;
