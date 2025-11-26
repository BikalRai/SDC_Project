import React, { useEffect } from "react";

import Approutes from "./components/routes/Approutes";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromToken } from "./slices/auth.slice";

const App = () => {
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("authToken");

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authToken && !user) {
      dispatch(loadUserFromToken());
    }
  }, [dispatch, authToken, user]);
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
