import { Button } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import postUserController from "../controllers/postUser.controller";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const CreateUser = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(postUserController({ name, role, email, password },
      () => {
        setEmail("");
        setPassword("");
      }));
  };

  return (
    <Layout pageName="Create User">
      <div className="mb-3">
        <Button variant="outlined" onClick={() => history.goBack()}>
          <ArrowBackOutlinedIcon color="primary" />
        </Button>
      </div>
      <div className="flex flex-col space-y-5 p-10 bg-white">
        <form
          className="flex flex-col space-y-8 w-[50%]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="
            text-xl border-b-2 focus:outline-none
             focus:border-b-2 focus:border-b-[#1976d2]
             "
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">-- Select Role --</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="
            text-xl border-b-2 focus:outline-none
             focus:border-b-2 focus:border-b-[#1976d2]
             "
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="
            text-xl border-b-2 focus:outline-none
             focus:border-b-2 focus:border-b-[#1976d2]
             "
          />
          <div className="">
            <Button type="submit" variant="contained">
              Create User
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateUser;
