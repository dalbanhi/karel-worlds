import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showError = (message: string) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    progress: undefined,
    transition: Flip,
  });
};
