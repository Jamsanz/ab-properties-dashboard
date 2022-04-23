import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Layout from "../components/Layout";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getFormsSelector } from "../store/slices/getFormsSlice";
import moment from "moment";
import getResponsesController from "../controllers/getResponses.controller";
import { IForm } from "../interfaces/form.interface";
import { useHistory } from "react-router-dom";
import { DeleteAlert, http } from "../utils/utils";
import getFormsController from "../controllers/getForms.controller";

const Dashboard = () => {
  const [forms, setForms] = useState<IForm[]>([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const formsState = useSelector(getFormsSelector);

  const dateAndTime = (string: string) =>
    moment(string).format("Do MMM YY, h:mm");

  const handleViewResponses = (id: string) => {
    dispatch(
      getResponsesController(id, () => {
        history.push("/responses");
      })
    );
  };

  const handleDelete = (id: string) => {
    DeleteAlert().then((result) => {
      if (result.isConfirmed) {
        http
          .delete(`/documents/${id}`)
          .then((res) => toastr.success(res.data.message))
          .catch((error) => console.log(error))
          .finally(() => setForms(forms.filter((form) => form._id !== id)));
      }
    });
  };

  useEffect(() => {
    if (formsState.forms) {
      setForms(formsState.forms);
    }
  }, [formsState]);

  useEffect(() => {
    dispatch(getFormsController());
  }, []);
  return (
    <Layout pageName="Data">
      <Table responsive className="shadow-md rounded-md w-[100%]">
        <thead
          className="
              uppercase font-thin
              bg-[#f5f7fa] text-[#828e99]
              "
        >
          <tr className="p-5">
            <th>#</th>
            <th className="py-5">Doc Name</th>
            <th className="py-5">Created At</th>
            <th className="py-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {forms?.map((form, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>
                <FolderIcon className="mr-2" color="primary" /> {form.doc_name}
              </td>
              <td>{dateAndTime(form.createdAt!)}</td>
              <td>
                <VisibilityOutlinedIcon
                  className="mr-2 action-btn"
                  color="primary"
                  onClick={() => handleViewResponses(form._id!)}
                />
                <DeleteOutlinedIcon
                  color="error"
                  className="action-btn"
                  onClick={() => handleDelete(form._id!)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default Dashboard;
