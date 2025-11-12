import React from "react";

import Approutes from "./components/routes/Approutes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Approutes />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme='light'
      />
    </>
  );
};

export default App;
