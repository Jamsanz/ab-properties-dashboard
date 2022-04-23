import { Dispatch } from "react";
import { getUsers, getUsersError, getUsersSuccess } from "../store/slices/usersSlice";
import { http } from "../utils/utils";
const usersController = () => async (dispatch: Dispatch<any>): Promise<void> => {
  dispatch(getUsers());
  try {
    const response = await http.get('/users');
    dispatch(getUsersSuccess(response.data.data));
  } catch (error) {
    console.log(error);
    dispatch(getUsersError());
  }
};

export default usersController;