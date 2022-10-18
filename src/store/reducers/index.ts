import { combineReducers } from "@reduxjs/toolkit";
import authenticationReducer from "../slices/authenticationSlice";
import usersReducer from '../slices/usersSlice';
import postUserReducer from '../slices/postUserSlice';
import getUserReducer from '../slices/getUser';

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  users: usersReducer,
  postUser: postUserReducer,
  getUser: getUserReducer
});
export type RootState = ReturnType<typeof rootReducer>;
