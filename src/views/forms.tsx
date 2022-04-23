import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import Layout from "../components/Layout";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getFormsSelector } from "../store/slices/getFormsSlice";
import { IForm } from "../interfaces/form.interface";
import getFormController from "../controllers/getForm.controller";
import { useHistory } from "react-router-dom";
import getFormsController from "../controllers/getForms.controller";
import moment from "moment";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import toastr, { DeleteAlert, http } from "../utils/utils";
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";

const Forms = () => {
  const [forms, setForms] = useState<IForm[]>([]);
  const dispatch = useDispatch();
  const formsState = useSelector(getFormsSelector);
  const history = useHistory();
  const [itemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;

  const currentItems: IForm[] = forms.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const changePage = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (id: string) => {
    dispatch(
      getFormController(id, () => {
        history.push("/form");
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

  const dateAndTime = (string: string) =>
    moment(string).format("D MMM YY, h:mm");

  useEffect(() => {
    if (formsState.forms) {
      setForms(formsState.forms);
    }
  }, [formsState]);

  useEffect(() => { 
    let page = [];
    for (let i = 1; i <= Math.ceil(forms.length / itemsPerPage); i++) {
      page.push(i);
    }
    setPages(page);
  }, []);

  useEffect(() => {
    dispatch(getFormsController());
  }, []);
  return (
    <Layout pageName="Forms">
      <Table responsive className="shadow-md rounded-md w-[100%]">
        <thead
          className="
              uppercase font-thin
              bg-[#f5f7fa] text-[#828e99]
              "
        >
          <tr className="p-5">
            <th>#</th>
            <th className="py-5">Title</th>
            <th className="py-5">Creation Date</th>
            <th className="py-5">Last Edited Date</th>
            <th className="py-5">Fields</th>
            <th className="py-5">Action</th>
          </tr>
        </thead>
        {formsState.isLoading ? (
          <tbody>
            <tr className="p-10 text-center">
              <td></td>
              <td></td>
              <td>
                <Spinner animation="border" color="#1976d2" />
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {currentItems.map((form, i) => (
              <tr key={i}>
                <th scope="row" className="px-2">
                  {i + 1}
                </th>
                <td>
                  <ArticleOutlinedIcon className="mr-3" color="primary" />{" "}
                  {form.doc_name}
                </td>
                <td>{dateAndTime(form.createdAt!)}</td>
                <td>{dateAndTime(form.updatedAt!)}</td>
                <td>{form.questions?.length ?? 0 + "Fields"}</td>
                <td>
                  <EditOutlinedIcon
                    onClick={() => handleEdit(form._id!)}
                    className="mr-2 action-btn"
                    color="primary"
                  />
                  <DeleteOutlinedIcon
                    onClick={() => handleDelete(form._id!)}
                    className="action-btn"
                    color="error"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
        <tfoot>
          <tr>
            <td colSpan={6} className="px-4">
              <ul className="flex space-x-3 justify-end">
                <li
                  className="pagination-item"
                  onClick={prevPage}
                >
                  <ChevronLeftOutlined />
                </li>
                {
                  pages.map((page, i) => (
                    <li
                      key={i}
                      onClick={() => changePage(page)}
                      className={`pagination-item ${page === currentPage && 'p-active'}`}
                    >
                      {page}
                    </li>
                  ))
                }
                <li className="pagination-item" onClick={nextPage}>
                  <ChevronRightOutlined />
                </li>
              </ul>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Layout>
  );
};

export default Forms;
