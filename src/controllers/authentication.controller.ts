import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "react";
import {
  authenticate,
  authenticationError,
  authenticationSuccess,
} from "../store/slices/authenticationSlice";
import { AB_PROPERTIES_TOKEN, AB_PROPERTIES_USER } from "../utils/constants";
import { http } from "../utils/utils";
import toastr from "../utils/utils";

const authenticationController =
  (email: string, password: string, mentor?: boolean) =>
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
      if (data.role !== "admin") {
        toastr.error("Access denied!");
        dispatch(authenticationError());
        return;
      };
      const user = {
        id: data._id,
        name: data.name,
        role: data.role,
        email: data.email,
      };
      window.localStorage.setItem(AB_PROPERTIES_USER, JSON.stringify(user));
      console.log(result.data);
      window.localStorage.setItem(AB_PROPERTIES_TOKEN, `${data._id}`);
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
