import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "react";
import {
  authenticate,
  authenticationError,
  authenticationSuccess,
} from "../store/slices/authenticationSlice";
import { DATA_COLLECT_TOKEN, DATA_COLLECT_USER } from "../utils/constants";
import { http } from "../utils/utils";

const authenticationController = (email: string, password: string, mentor?: boolean) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    if (email === "" || email === null) {
      toastr.error("Email is required.");
      return;
    }

    if (password === "" || password === null) {
      toastr.error("Password is required.");
      return;
    }
    dispatch(authenticate());
    try {
      const result = await http.post("/login", { email, password });
      const data = (result as AxiosResponse).data.data;
      const user = { id: data._id, email: data.email };
      window.localStorage.setItem(DATA_COLLECT_USER, JSON.stringify(user));
      console.log(result.data);
      window.localStorage.setItem(DATA_COLLECT_TOKEN, `${data._id}`);
      dispatch(authenticationSuccess(user));
      window.location.reload();
    } catch (error) {
      if (
        (error as AxiosError).response?.status === 401 ||
        (error as AxiosError).response?.status === 404 ||
        (error as AxiosError).response?.status === 422 ||
        (error as AxiosError).response?.status === 409
      ) {
        console.log((error as AxiosError).response?.status);
        toastr.error("Wrong email or password");
        dispatch(authenticationError());
      } else {
        toastr.error(
          "Oops! Something went wrong. Refresh your browser and try again."
        );
        dispatch(authenticationError());
        return;
      }
    }
  };

export default authenticationController;
