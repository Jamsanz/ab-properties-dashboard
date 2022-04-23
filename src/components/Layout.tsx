import React, { ReactNode } from "react";
import { Button, Typography } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import Modal from "./Modal";
import { DATA_COLLECT_TOKEN } from "../utils/constants";
import { Link, useHistory } from "react-router-dom";
import { LogOut } from "../utils/utils";
// import { Table } from "react-bootstrap";

interface IProps {
  children?: ReactNode;
  pageName?: string;
  props?: any;
}

const Layout = ({ children, pageName, ...props }: IProps) => {
  // const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();
  const toggle = (): void => {
    history.push("/form");
  };
  const logout = () => {
    LogOut()
      .then((result) => {
        if (result.isConfirmed) {
          window.localStorage.removeItem(DATA_COLLECT_TOKEN);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => window.location.reload());
  };
  return (
    <div className="bg-[#fafafa] min-h-[100vh] w-[100vw]">
      {/* <Modal show={open} toggle={ toggle}/> */}
      <div
        className="
        aside md:w-[260px] md:flex flex-col
        border-r-2 fixed h-[100vh]
        p-5 bg-white hidden
        "
      >
        <Typography
          component={"h5"}
          variant="h5"
          className="py-4 self-center font-bold"
        >
          <span className="font-extrabold">DataCollect</span>
        </Typography>
        <hr />
        <div className="side-menu inline-flex flex-col mt-3">
          <Link
            to={"/"}
            className={`hover:bg-[#fafafa] py-2 ${
              pageName === "Data" && "active"
            }`}
          >
            <StorageOutlinedIcon className="mr-3" color="primary" /> Data
          </Link>
          <Link
            to={"/forms"}
            className={`hover:bg-[#fafafa] py-2 ${
              pageName === "Forms" && "active"
            }`}
          >
            <ArticleOutlinedIcon className="mr-3" color="primary" /> Forms
          </Link>
          <Link
            to="/manage-users"
            className={`hover:bg-[#fafafa] py-2 ${
              pageName === "Manage Users" && "active"
            }`}
          >
            <PeopleOutlinedIcon className="mr-3" color="primary" />
            Manage Users
          </Link>
        </div>
        <div
          onClick={logout}
          className="mt-auto justify-self-end cursor-pointer"
        >
          <hr />
          <span className="hover:bg-[#fafafa] py-2">
            <LogoutOutlinedIcon className="mr-3" color="primary" />
            Logout
          </span>
        </div>
      </div>
      <div className="body md:ml-[280px] bg-[#fafafa] p-5">
        <div className="flex justify-between md:p-10">
          <h3 className="text-4xl font-bold">{pageName}</h3>
          <Button variant="contained" onClick={toggle}>
            <FolderIcon className="mr-2" /> New form
          </Button>
        </div>
        <div className="mt-5 p-10">{children}</div>
        <div className="flex justify-between px-12">
          <p className="text-[#828e99]">© Data Collect</p>
          <p className="text-[#828e99]">{new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
