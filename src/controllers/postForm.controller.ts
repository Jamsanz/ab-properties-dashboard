import { Dispatch } from "react";
import { IForm } from "../interfaces/form.interface";
import {
  postForm,
  postFormError,
  postFormSuccess,
} from "../store/slices/postFormSlice";
import { http } from "../utils/utils";
import toastr from "../utils/utils";

const postFormController = (form: IForm) => async (dispatch: Dispatch<any>) => {
  dispatch(postForm());
  try {
    const response = await http.post(`/documents`, {
      doc_name: form.doc_name,
      doc_description: form.doc_description,
      questions: form.questions
    });
    dispatch(postFormSuccess(response.data));
    toastr.success(response.data.message);
  } catch (error) {
    dispatch(postFormError("Oops! Something went wrong"));
    console.log(error);
    toastr.error("Oops! Something went wrong");
  }
};

export default postFormController;
