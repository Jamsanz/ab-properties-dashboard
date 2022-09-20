import { Dispatch } from "react";
import { IUser } from "../interfaces/user.interface";
import {
  postUser,
  postUserError,
  postUserSuccess,
} from "../store/slices/postUserSlice";
import { http } from "../utils/utils";
import toastr from "../utils/utils";

const postUserController =
  (user: IUser, callback: () => void) => async (dispatch: Dispatch<any>) => {
    dispatch(postUser());
    if (user.email === "") {
      toastr.error("Email is required");
      return;
    }
    if (user.password === "") {
      toastr.error("Password is required");
      return;
    }
    try {
      const response = await http.post(`/signup`, user);
      dispatch(postUserSuccess(response.data));
      toastr.success(response.data.message);
      callback();
    } catch (error) {
      dispatch(postUserError());
      console.log(error);
      toastr.error("Oops! Something went wrong");
    }
  };

export default postUserController;
