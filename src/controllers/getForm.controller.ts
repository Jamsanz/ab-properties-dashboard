import { Dispatch } from "react";
import { getForm, getFormError, getFormSuccess } from "../store/slices/getFormSlice";
import { http } from "../utils/utils";

const getFormController = (id: string, callback: ()=> void) => async (dispatch: Dispatch<any>) => {
  dispatch(getForm());
  try {
    const response = await http.get(`/documents/${id}`);
    dispatch(getFormSuccess(response.data));
    callback();
  } catch (error) {
    dispatch(getFormError("Oops! Something went wrong"));
    console.log(error);
    toastr.error("Oops! Something went wrong");
  }
};

export default getFormController;
