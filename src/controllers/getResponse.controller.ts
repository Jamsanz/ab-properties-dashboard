import { Dispatch } from "react";
import {
  getResponse,
  getResponseError,
  getResponseSuccess,
} from "../store/slices/getResponseSlice";
import { http } from "../utils/utils";

const getResponseController =
  (id: string, callback: () => void) => async (dispatch: Dispatch<any>) => {
    dispatch(getResponse());
    try {
      const response = await http.get(`/response/${id}`);
      dispatch(getResponseSuccess(response.data));
      callback();
    } catch (error) {
      dispatch(getResponseError("Oops! Something went wrong"));
      console.log(error);
      toastr.error("Oops! Something went wrong");
    }
  };

export default getResponseController;
