import { ToastContainer, Flip } from "react-toastify";

const ToastContainerCom = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="light"
      transition={Flip}
    />
  );
};

export default ToastContainerCom;
