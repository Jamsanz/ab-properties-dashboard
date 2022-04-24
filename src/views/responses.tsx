import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { IResponse } from "../interfaces/response.interface";
import { getResponsesSelector } from "../store/slices/getResponsesSlice";
import moment from "moment";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { CSVLink } from "react-csv";
import { Button } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import getResponseController from "../controllers/getResponse.controller";
import { useHistory } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";

const Responses = () => {
  const [responses, setResponses] = useState<IResponse[]>([]);
  const [csvData, setCsvData] = useState<any>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const responsesState = useSelector(getResponsesSelector);

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;

  const currentItems: IResponse[] = responses?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const changePage = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const dateAndTime = (string: string) =>
    moment(string).format("D MMM YY, h:mm");

  const handleViewResponse = (id: string): void => {
    dispatch(getResponseController(id, () => history.push("/response")));
  };

  useEffect(() => {
    if (responsesState) {
      setResponses(responsesState.responses!);
      setCsvData(
        responsesState.responses?.map((res, i) => ({
          SN: `00${i + 1}`,
          ...res.response,
        }))
      );
    }
  }, [responsesState]);
  useEffect(() => {
    let page = [];
    for (let i = 1; i <= Math.ceil(responses?.length / itemsPerPage); i++) {
      page.push(i);
    }
    setPages(page);
  }, [responses]);

  return (
    <Layout pageName="Responses">
      <div className="flex justify-between py-3">
        <div className="">
          <Button variant="outlined" onClick={() => history.goBack()}>
            <ArrowBackOutlinedIcon color="primary" />
          </Button>
        </div>
        {csvData && (
          <Button>
            <CSVLink data={csvData}>Export CSV</CSVLink>
          </Button>
        )}
      </div>
      <Table responsive className="shadow-md rounded-md w-[100%]">
        <thead
          className="
              uppercase font-thin
              bg-[#f5f7fa] text-[#828e99]
              "
        >
          <tr className="p-5">
            <th>SN</th>
            <th className="py-5">Response ID</th>
            <th className="py-5">Created At</th>
            <th className="py-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((response, i) => (
            <tr>
              <th scope="row">00{i + 1}</th>
              <td>
                <StorageIcon color="primary" /> {response._id}
              </td>
              <td>{dateAndTime(response.createdAt!)}</td>
              <td>
                <VisibilityOutlinedIcon
                  className="mr-2 action-btn"
                  color="primary"
                  onClick={() => handleViewResponse(response._id!)}
                />
                {/* <DeleteOutlinedIcon
                  color="error"
                  className="action-btn"
                  onClick={() => handleDelete(response._id!)}
                /> */}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="px-4">
              <ul className="flex space-x-3 justify-end">
                <p>Total: { responses?.length}</p>
                <select
                  className="input-b"
                  onChange={e => setItemsPerPage(+(e.target.value))}
                  value={itemsPerPage}
                >
                  <option value="10">10</option>
                  <option value="100">100</option>
                  <option value="1000">1000</option>
                </select>
                <li
                  className={`pagination-item ${currentPage === pages[0] && 'disabled'}`}
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
                  className={`pagination-item ${currentPage === pages.length && 'disabled'}`}
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

export default Responses;
