import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../store/slices/usersSlice";
import { IUser } from "../interfaces/user.interface";
import usersController from "../controllers/users.controller";
import toastr, { DeleteAlert, http } from "../utils/utils";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";


const Users = () => {
  const [data, setData] = useState<IUser[]>([]);
  const usersState = useSelector(usersSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (id: string) => {
    DeleteAlert().then((result) => {
      if (result.isConfirmed) {
        http
          .delete(`/users/${id}`)
          .then((res) => toastr.success(res.data.message))
          .catch((error) => console.log(error))
          .finally(() => setData(data.filter((user) => user._id !== id)));
      }
    });
  };

  useEffect(() => {
    if (usersState.user) {
      setData(usersState.user);
    }
  }, [usersState]);

  useEffect(() => {
    dispatch(usersController());
  }, []);
  return (
    <Layout pageName="Manage Users">
      <div className="flex mb-3">
        <Button variant="outlined" onClick={()=> history.push('/create-user')}>
          <AddIcon className="mr-2" />{" "}
          Add User
        </Button>
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
            <th className="py-5">E-mail</th>
            <th className="py-5">Password</th>
            <th className="py-5">Action</th>
          </tr>
        </thead>
        {usersState.isLoading ? (
          <tbody>
            <tr className="p-10 text-center">
              <td></td>
              <td>
                <Spinner animation="border" color="#1976d2" />
              </td>
              <td></td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.map((user, i) => (
              <tr key={i}>
                <th scope="row" className="px-2">
                  {i + 1}
                </th>
                <td>{user.email}</td>
                <td>{user.password?.substring(0, 10)} ...</td>
                <td>
                  <DeleteOutlinedIcon
                    onClick={() => handleDelete(user._id!)}
                    className="action-btn"
                    color="error"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </Layout>
  );
};

export default Users;
