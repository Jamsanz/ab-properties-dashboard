import toastr from 'toastr';
import Swal from 'sweetalert2';
import 'toastr/build/toastr.css';
// import '../assets/css/style.css';

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

export const Alert = () =>(
  Swal.fire({
    title: "Delete",
    text: "Are you sure you want to delete this course?",
    icon: "warning",
    cancelButtonText: "CANCEL",
    cancelButtonColor: "gray",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "DELETE",
    confirmButtonColor: "red",

  })
);

export default toastr;
