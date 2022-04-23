import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import getFormsReducer from "../slices/getFormsSlice";
import getFormReducer from "../slices/getFormSlice";
import postFormReducer from "../slices/postFormSlice";
import updateFormReducer from "../slices/updateFormSlice";
import authenticationReducer from "../slices/authenticationSlice";
import getResponsesReducer from "../slices/getResponsesSlice";
import getResponseReducer from "../slices/getResponseSlice";
import usersReducer from '../slices/usersSlice';
import postUserReducer from '../slices/postUserSlice';

export const rootReducer = combineReducers({
  counter: counterReducer,
  authentication: authenticationReducer,
  getForms: getFormsReducer,
  getForm: getFormReducer,
  postForm: postFormReducer,
  updateForm: updateFormReducer,
  getResponses: getResponsesReducer,
  getResponse: getResponseReducer,
  users: usersReducer,
  postUser: postUserReducer
});
export type RootState = ReturnType<typeof rootReducer>;
