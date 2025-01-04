// import { toast } from "react-toastify";
import Swal from "sweetalert2";
// Define the function type for messages as a string
export const handleError = (msg: string): void => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: msg,
    timer: 3000,
    showConfirmButton: false,
    position: "top-right",
  });
};

export const handleSuccess = (msg: string): void => {
  Swal.fire({
    icon: "success",
    title: "Submitted!",
    text: msg,
    timer: 3000,
    showConfirmButton: false,
    position: "top-right",
  });
};
