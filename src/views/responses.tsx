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

const Responses = () => {
  const [responses, setResponses] = useState<IResponse[]>([]);
  const [csvData, setCsvData] = useState<any>([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const responsesState = useSelector(getResponsesSelector);

  const dateAndTime = (string: string) =>
    moment(string).format("Do MMM YY, h:mm");

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
            <th>#</th>
            <th className="py-5">Response ID</th>
            <th className="py-5">Created At</th>
            <th className="py-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {responses?.map((response, i) => (
            <tr>
              <th scope="row">{i + 1}</th>
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
      </Table>
    </Layout>
  );
};

export default Responses;
