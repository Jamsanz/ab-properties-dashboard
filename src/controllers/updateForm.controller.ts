import { Dispatch } from "react";
import { IForm } from "../interfaces/form.interface";
import {
  updateForm,
  updateFormError,
  updateFormSuccess,
} from "../store/slices/updateFormSlice";
import { http } from "../utils/utils";
import toastr from "../utils/utils";

const updateFormController = (form: IForm) => async (dispatch: Dispatch<any>) => {
  dispatch(updateForm());
  try {
    const response = await http.put(`/documents/${form._id}`, form);
    dispatch(updateFormSuccess(response.data));
    toastr.success(response.data.message);
  } catch (error) {
    dispatch(updateFormError("Oops! Something went wrong"));
    console.log(error);
    toastr.error("Oops! Something went wrong");
  }
};

export default updateFormController;
