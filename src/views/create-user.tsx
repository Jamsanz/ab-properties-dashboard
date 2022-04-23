import { Button } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import postUserController from "../controllers/postUser.controller";

const CreateUser = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(postUserController({ email, password },
      () => {
        setEmail("");
        setPassword("");
      }));
  };

  return (
    <Layout pageName="Create User">
      <div className="flex flex-col space-y-5 p-10 bg-white">
        {/* <h1 className="font-bold text-2xl">Add User</h1> */}
        <form className="flex flex-col space-y-8 w-[50%]" onSubmit={handleSubmit}>
          <input
            type="text"
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
            <Button type="submit" variant="contained">Create User</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateUser;
