import React, { ReactNode, useState } from "react";
import { Button, Typography } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { AB_PROPERTIES_TOKEN } from "../utils/constants";
import { Link } from "react-router-dom";
import { getUser, LogOut } from "../utils/utils";
import { IUser } from "../interfaces/user.interface";
import PowerIcon from '@mui/icons-material/PowerSettingsNew';

interface IProps {
  children?: ReactNode;
  pageName?: string;
  props?: any;
}

const Layout = ({ children, pageName, ...props }: IProps) => {
  const [user] = useState<IUser>(getUser);
  const toggle = (): void => {
    window.location.href = "/create-user";
  };
  const logout = () => {
    LogOut()
      .then((result) => {
        if (result.isConfirmed) {
          window.localStorage.removeItem(AB_PROPERTIES_TOKEN);
          window.location.reload();
        }
        if (result.isDismissed) {
          return;
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-[#fafafa] min-h-[100vh] w-[100vw]">
      <span
        onClick={logout}
        className="absolute md:hidden bottom-3 shadow-xl right-2 bg-[#FFB34D] p-2 rounded-full action-btn"
      >
        <PowerIcon />
      </span>
      {/* <Modal show={open} toggle={ toggle}/> */}
      <div
        className="md:w-[260px] md:flex flex-col
        border-r-2 fixed h-[100vh]
        p-5 bg-white hidden
        "
      >
        <Typography
          component={"h5"}
          variant="h5"
          className="py-4 self-center font-bold"
        >
          <span className="font-extrabold flex"> <img src="./adaptive-icon.png" className="mr-2" width={30} height={23} alt="Ab-properties" /> Ab-properties</span>
        </Typography>
        <hr />
        <div className="side-menu inline-flex flex-col mt-3">
          <Link
            to="/manage-users"
            className={`hover:bg-[#fafafa] py-2 ${pageName === "Dashboard" && "active"
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
      <div className="body md:ml-[280px] bg-[#fafafa] md:p-5">
        <div className="flex justify-between md:p-10 p-3">
          <h3 className="md:text-4xl text-xl font-bold">{pageName}</h3>
          {
            pageName === "Dashboard" &&
            <React.Fragment>
              <img src="./adaptive-icon.png" className="md:hidden" width={30} height={24} alt="Ab-properties" />
              <span className="hidden md:inline">
                <Button variant="contained" sx={{ background: "#FFB34D", '&:hover': { background: "#FFB34E" } }} onClick={toggle}>
                  <PersonAddIcon className="mr-3" /> New User
                </Button>
              </span>
            </React.Fragment>
          }
        </div>
        <div className="mt-5 md:p-10">{children}</div>
        <div className="flex justify-between px-12">
          <p className="text-[#828e99]">© Ab-properties </p>
          <p className="text-[#828e99]">{new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
