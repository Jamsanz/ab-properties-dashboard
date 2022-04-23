import { Dispatch } from "react";
import {
  getForms,
  getFormsError,
  getFormsSuccess,
} from "../store/slices/getFormsSlice";
import { http } from "../utils/utils";

const getFormsController = () => async (dispatch: Dispatch<any>) => {
  dispatch(getForms());
  try {
    const response = await http.get("/documents");
    dispatch(getFormsSuccess(response.data));
  } catch (error) {
    dispatch(getFormsError("Oops! Something went wrong"));
    console.log(error);
    toastr.error("Oops! Something went wrong");
  }
};

export default getFormsController;
