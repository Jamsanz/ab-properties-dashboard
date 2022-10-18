import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IUser } from "../../interfaces/user.interface"

export interface IGetUser {
  data?: IUser;
  isLoading: boolean;
  error?: string;
  success?: string;
}

const initialState: IGetUser = {
  data: undefined,
  isLoading: false,
  error: undefined,
  success: undefined
}

const getUserSlice = createSlice({
  initialState,
  name: 'getUser',
  reducers: {
    getUser: (state) => ({ ...state, isLoading: true }),
    getUserSuccess: (state, action) => ({ ...state, isLoading: false, data: action.payload }),
    getUserError: (state, action) => ({ ...state, isLoading: false, error: action.payload })
  }
});

export const { getUser, getUserSuccess, getUserError } = getUserSlice.actions;
export const getUserSelector = (state: RootState) => state.getUser;

export default getUserSlice.reducer;