import { Dispatch } from "react";
import {
  getResponses,
  getResponsesError,
  getResponsesSuccess,
} from "../store/slices/getResponsesSlice";
import { http } from "../utils/utils";

const getResponsesController =
  (doc_id: string, callback: ()=> void) => async (dispatch: Dispatch<any>) => {
    dispatch(getResponses());
    try {
      const response = await http.get(`response/document/${doc_id}`);
      dispatch(getResponsesSuccess(response.data));
      callback();
    } catch (error) {
      dispatch(getResponsesError("Oops! Something went wrong"));
      console.log(error);
      toastr.error("Oops! Something went wrong");
    }
  };

export default getResponsesController;
