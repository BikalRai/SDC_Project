import Checkout from "@/pages/Checkout";
import Furniture from "@/pages/Furniture";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFoundPage from "@/pages/NotFoundPage";
import OAuth2Redirect from "@/pages/OAuth2Redirect";
import Register from "@/pages/Register";
import Vehicle from "@/pages/vehicle";
import { Route, Routes } from "react-router-dom";

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
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </>
  );
};

export default Approutes;
