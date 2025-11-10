import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth2Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token is already in localStorage
    const existingToken = localStorage.getItem("authToken");

    if (existingToken) {
      // Token already stored, just navigate
      console.log("Token already exists in localStorage, navigating to /");
      navigate("/", { replace: true });
      return;
    }

    // Otherwise, get token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("Token from URL:", token);

    if (token) {
      console.log("Storing token and navigating to /");
      localStorage.setItem("authToken", token);
      navigate("/", { replace: true });
    } else {
      console.log("No token found, redirecting to login");
      navigate("/login");
    }
  }, []);
  return <div>Logging you in...</div>;
};

export default OAuth2Redirect;
