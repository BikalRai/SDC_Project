import AboutUsPage from "@/pages/AboutUsPage";
import Checkout from "@/pages/Checkout";
import CompleteProfile from "@/pages/completeProfile";
import Furniture from "@/pages/Furniture";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFoundPage from "@/pages/NotFoundPage";
import OAuth2Redirect from "@/pages/OAuth2Redirect";
import Register from "@/pages/Register";
import Vehicle from "@/pages/vehicle";
import VerificationPage from "@/pages/verificationPage";
import Verification from "@/pages/Verfication";
import { Route, Routes } from "react-router-dom";

const Approutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/completeprofile" element={<CompleteProfile />} />
        <Route path="/verificationpage" element={<VerificationPage />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </>
  );
};

export default Approutes;
