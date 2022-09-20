import { Button } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import postUserController from "../controllers/postUser.controller";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const CreateUser = () => {
  const [email, setEmail] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [fName, setFName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(postUserController({ first_name: fName, last_name: lName, role, email, password },
      () => {
        setEmail("");
        setPassword("");
        setFName("");
        setLName("");
        setRole("");
      }));
  };

  return (
    <Layout pageName="Create User">
      <div className="mb-3 md:ml-0 ml-3 ">
        <Button variant="outlined" onClick={() => history.goBack()}>
          <ArrowBackOutlinedIcon color="primary" />
        </Button>
      </div>
      <div className="flex flex-col space-y-5 p-10 bg-white">
        <form
          className="flex flex-col space-y-8 md:w-[50%]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            placeholder="First Name"
            className="
            md:text-xl text-md border-b-2 focus:outline-none
             focus:border-b-2 focus:border-b-[#1976d2]
             "
          />
          <input
            type="text"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            placeholder="Last Name"
            className="
            text-md md:text-xl border-b-2 focus:outline-none
             focus:border-b-2 focus:border-b-[#1976d2]
             "
          />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="
            text-md md:text-xl border-b-2 focus:outline-none
             focus:border-b-2 focus:border-b-[#1976d2]
             ">
            <option value="" disabled className="text-gray-300">-- Select User Role --</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            {/* <option value="super admin">Super Admin</option> */}
          </select>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="
            text-md md:text-xl border-b-2 focus:outline-none
             focus:border-b-2 focus:border-b-[#1976d2]
             "
          />
          <div className="inline-flex border-b-2 focus-within:border-b-2 focus-within:border-b-[#1976d2]">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="text-md md:text-xl focus:outline-none flex-1"
            />
            <span onClick={()=> setShow(!show)}>
              {
                show ? <VisibilityOffIcon /> : <VisibilityIcon />
              }
            </span>
          </div>
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
