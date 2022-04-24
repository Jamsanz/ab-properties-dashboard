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
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";

const Dashboard = () => {
  const [forms, setForms] = useState<IForm[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const formsState = useSelector(getFormsSelector);

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

  const dateAndTime = (string: string) =>
    moment(string).format("D MMM YY, h:mm");

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

  useEffect(() => {
    let page = [];
    for (let i = 1; i <= Math.ceil(forms.length / itemsPerPage); i++) {
      page.push(i);
    }
    setPages(page);
  }, [forms, itemsPerPage]);
  return (
    <Layout pageName="Dashboard">
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
          {currentItems?.map((form, i) => (
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
        <tfoot>
          <tr>
            <td colSpan={6} className="px-4">
              <ul className="flex space-x-3 justify-end">
                <select
                  className="input-b"
                  onChange={(e) => setItemsPerPage(+e.target.value)}
                  value={itemsPerPage}
                >
                  <option value="10">10</option>
                  <option value="100">100</option>
                  <option value="1000">1000</option>
                </select>
                <li
                  className={`pagination-item ${
                    currentPage === pages[0] && "disabled"
                  }`}
                  onClick={prevPage}
                >
                  <ChevronLeftOutlined />
                </li>
                {pages.map((page, i) => (
                  <li
                    key={i}
                    onClick={() => changePage(page)}
                    className={`pagination-item ${
                      page === currentPage && "p-active"
                    }`}
                  >
                    {page}
                  </li>
                ))}
                <li
                  className={`pagination-item ${
                    currentPage === pages.length && "disabled"
                  }`}
                  onClick={nextPage}
                >
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

export default Dashboard;
