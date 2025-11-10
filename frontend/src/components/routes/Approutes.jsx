import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFoundPage from "@/pages/NotFoundPage";
import Register from "@/pages/Register";
import { Route, Routes } from "react-router-dom";

const Approutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/register' element={<Register />} /> */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Approutes;
