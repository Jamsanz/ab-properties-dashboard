import { Dispatch } from "@reduxjs/toolkit";
import { getUser, getUserError, getUserSuccess } from "../store/slices/getUser";
import { http } from "../utils/utils";

const getUserController = (id: string, callback: ()=> void) => async (dispatch: Dispatch) => {
  if (!id) {
    dispatch(getUserError('user id is required'));
    return;
  }

  dispatch(getUser());
  try {
    const response = await http.get(`/users/${id}`);
    dispatch(getUserSuccess(response.data.data));
    callback();
  } catch (error) {
    dispatch(getUserError((error as any).response.msg));
  }
}

export default getUserController;