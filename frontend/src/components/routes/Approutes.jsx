import AboutUsPage from "@/pages/AboutUsPage";
import Checkout from "@/pages/Checkout";
import Furniture from "@/pages/Furniture";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFoundPage from "@/pages/NotFoundPage";
import OAuth2Redirect from "@/pages/OAuth2Redirect";
import Register from "@/pages/Register";
import Vehicle from "@/pages/vehicle";
import { Route, Routes } from "react-router-dom";
import UserDashboardLayout from "../layout/UserDashboardLayout";

const Approutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/find/vehicle' element={<Vehicle />} />
          <Route path='/find/furniture' element={<Furniture />} />
          {/* <Route path="/find/vehicle" element={<Vehicle />} />
          <Route path="/find/vehicle" element={<Vehicle />} /> */}
        </Route>
        <Route path='/oauth2/redirect' element={<OAuth2Redirect />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/about' element={<AboutUsPage />} />
        <Route path='user/dashboard' element={<UserDashboardLayout />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Approutes;
