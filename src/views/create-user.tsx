import { Button } from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import postUserController from "../controllers/postUser.controller";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IUser } from "../interfaces/user.interface";
import { getUserSelector, getUserSuccess } from "../store/slices/getUser";

const CreateUser = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const userState = useSelector(getUserSelector);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData!, [name]: value });
  }
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(postUserController(userData!,
      () => {
        !userState.data &&
        setUserData({
          first_name: "",
          last_name: "",
          role: "",
          password: "",
          email: ""
        })
      }, userState.data?._id && userState.data._id));
  };

  useEffect(() => {
    if (userState.data) {
      setUserData({
        first_name: userState.data.first_name,
        last_name: userState.data.last_name,
        role: userState.data.role,
        password: userState.data.password,
        email: userState.data.email
      });
    }
    return () => {
      dispatch(getUserSuccess(null));
    }
  }, [userState.data]);
  return (
    <Layout pageName={userState.data ? "Manage User" : "Create User"}>
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
            value={userData?.first_name}
            name="first_name"
            onChange={handleChange}
            placeholder="First Name"
            className="
            md:text-xl text-md border-b-2 focus:outline-none
             focus:border-b-2 focus:border-b-[#1976d2]
             "
            disabled={!!userState.data}
          />
          <input
            type="text"
            value={userData?.last_name}
            onChange={handleChange}
            name="last_name"
            placeholder="Last Name"
            className="
            text-md md:text-xl border-b-2 focus:outline-none
             focus:border-b-2 focus:border-b-[#1976d2]
             "
            disabled={!!userState.data}
          />
          <select value={userData?.role} onChange={handleChange} className="
            text-md md:text-xl border-b-2 focus:outline-none
             focus:border-b-2 focus:border-b-[#1976d2]
             "
            name="role"
            disabled={!!userState.data}
          >
            <option value="" disabled className="text-gray-300">-- Select User Role --</option>={!!userState.data}
            <option value="user">User</option>
            <option value="admin">Admin</option>
            {/* <option value="super admin">Super Admin</option> */}
          </select>
          <input
            type="email"
            name="email"
            value={userData?.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="
            text-md md:text-xl border-b-2 focus:outline-none
             focus:border-b-2 focus:border-b-[#1976d2]
             "
            disabled={!!userState.data}
          />
          <div className="inline-flex border-b-2 focus-within:border-b-2 focus-within:border-b-[#1976d2]">
            <input
              type={show ? "text" : "password"}
              value={userData?.password}
              onChange={handleChange}
              name="password"
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
              {
                userState.data ? "Update" : "Create User"
              }
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateUser;
