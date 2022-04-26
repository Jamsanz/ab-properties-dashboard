import axios from "axios";
import Cookies from "js-cookie";
import toastr from "toastr";
import "toastr/build/toastr.css";
import Swal from "sweetalert2";
import { IUser } from "../interfaces/user.interface";
import { DATA_COLLECT_USER } from "./constants";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://data-collect-server.herokuapp.com";

export const http = axios.create({
  baseURL,
  headers: {
    Authorization: `${Cookies.get("authorization")}`,
  },
});

export const getUser = (): IUser => {
  return JSON.parse(window.localStorage.getItem(DATA_COLLECT_USER)!);
};

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

export const Alert = () =>
  Swal.fire({
    title: "Update Information",
    text: "Are you sure you want to save these changes?",
    icon: "warning",
    cancelButtonText: "CANCEL",
    cancelButtonColor: "red",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "UPDATE",
    confirmButtonColor: "green",
  });
export const DeleteAlert = () =>
  Swal.fire({
    title: "Delete Record",
    text: "Are you sure you want to delete this record?",
    icon: "warning",
    cancelButtonText: "CANCEL",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "DELETE",
    confirmButtonColor: "red",
  });

export const LogOut = () =>
  Swal.fire({
    title: "Log Out",
    text: "Are you sure you want to log out?",
    icon: "warning",
    cancelButtonText: "CANCEL",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "Log out",
    confirmButtonColor: "red",
  });

export default toastr;
