import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { IResponse } from "../interfaces/response.interface";
import { getResponseSelector } from "../store/slices/getResponseSlice";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useHistory } from "react-router-dom";

const Response = () => {
  const [response, setResponse] = useState<IResponse>();
  const history = useHistory();
  const responseState = useSelector(getResponseSelector);

  useEffect(() => {
    if (responseState.response) {
      setResponse(responseState.response);
    }
  }, [responseState]);
  
  return (
    <Layout pageName="Response">
      <div className="mb-3">
        <Button variant="outlined" onClick={() => history.goBack()}>
          <ArrowBackOutlinedIcon color="primary"/>
        </Button>
      </div>
      <div className="p-10 rounded-md bg-white flex">
        <div className="inline-flex flex-col flex-1 space-y-1">
          {response?.response &&
            Object.keys(response?.response!).map((ques, i) => (
              <p key={i} className="font-bold">
                {ques}:
              </p>
            ))}
        </div>
        <div className="inline-flex flex-col flex-4 space-y-1">
          {response?.response &&
            Object.keys(response?.response!).map((ans, i) => (
              <p key={i} className="">
                {(response as any).response[ans]}
              </p>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Response;
