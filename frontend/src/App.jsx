import React, { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromToken } from "./slices/auth.slice";
import { AppRouter } from "./components/routes/AppRouter";

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
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
};

export default App;
