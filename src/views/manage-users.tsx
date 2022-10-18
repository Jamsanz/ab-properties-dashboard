import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../store/slices/usersSlice";
import { IUser } from "../interfaces/user.interface";
import usersController from "../controllers/users.controller";
import toastr, { DeleteAlert, http } from "../utils/utils";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import getUserController from "../controllers/getUserController";


const Users = () => {
  const [data, setData] = useState<IUser[]>([]);
  const usersState = useSelector(usersSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;

  const currentItems: IUser[] = data.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const changePage = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (id: string): void => {
    dispatch(getUserController(id, () => {
      history.push("/create-user");
    }))
  }

  const handleDelete = (id: string): void => {
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
    let page = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      page.push(i);
    }
    setPages(page);
  }, [data, itemsPerPage]);


  useEffect(() => {
    dispatch(usersController());
  }, []);
  return (
    <Layout pageName="Dashboard">
      <div className="flex mb-3 ml-3 md:ml-0">
        <Button variant="outlined" onClick={() => history.push('/create-user')}>
          <AddIcon className="mr-2" />{" "}
          Add User
        </Button>
      </div>
      <div className="lg:flex-1 mx-3 mt-12 lg:mt-0 overflow-x-auto">
        <table className="w-full text-sm text-left rounded-md shadow-md text-gray-500">
          <thead
            className="text-xs overflow-x-scroll text-gray-700 uppercase bg-gray-50"
          >
            <tr className="p-5">
              <th>#</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">E-mail</th>
              <th scope="col" className="px-6 py-3">Password</th>
              <th scope="col" className="px-6 py-3">Action</th>
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
            <tbody className="overflow-x-scroll">
              {currentItems.map((user, i) => (
                <tr key={i} className="bg-white border-b">
                  <th scope="row" className="px-6 py-4">
                    {i + 1}
                  </th>
                  <td className="px-6 py-4">{user.first_name + " " + user.last_name}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.password?.substring(0, 10)} ...</td>
                  <td className="px-6 py-4">
                    <EditOutlinedIcon
                      onClick={() => handleEdit(user._id!)}
                      className="action-btn mr-1"
                    />
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
                    className={`pagination-item ${currentPage === pages[0] && "disabled"
                      }`}
                    onClick={prevPage}
                  >
                    <ChevronLeftOutlined />
                  </li>
                  {pages.map((page, i) => (
                    <li
                      key={i}
                      onClick={() => changePage(page)}
                      className={`pagination-item ${page === currentPage && "p-active"
                        }`}
                    >
                      {page}
                    </li>
                  ))}
                  <li
                    className={`pagination-item ${currentPage === pages.length && "disabled"
                      }`}
                    onClick={nextPage}
                  >
                    <ChevronRightOutlined />
                  </li>
                </ul>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

    </Layout>
  );
};

export default Users;
