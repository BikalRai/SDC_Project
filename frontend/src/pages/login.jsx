import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingBlobs from "../components/FloatingBlobs";
import { TextField } from "@mui/material";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ButtonWithIcon from "@/components/buttons/ButtonWithIcon";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginRequest, loginSuccess } from "@/slices/auth.slice";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [loginDetails, setloginDetails] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, authToken } = useSelector((state) => state.auth);

  const loginDetailsHandler = (e) => {
    const { name, value } = e.target;

    setloginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    const { email, password } = loginDetails;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email))
      newErrors.email = "Invalid email format: E.g: example@example.com";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    dispatch(loginRequest());
    try {
      const res = await axios.post(`${backendUrl}/auth/login`, {
        ...loginDetails,
      });
      console.log(res.data);

      dispatch(
        loginSuccess({
          user: res?.data?.user,
          token: res?.data?.accessToken,
          message: "Logged in successfully.",
        })
      );

      if (authToken) {
        localStorage.setItem("authToken", authToken);
        toast.success("Logged in successfully.");
      }

      if (isAuthenticated) {
        navigate("/");
      }

      console.log(authToken);
    } catch (error) {
      console.error(error, "error!!");
      dispatch(loginFailure(error?.response && error.response.data));
      toast.error("Invalid email or password");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <FloatingBlobs>
      <div className='p-4 min-h-dvh flex justify-center items-center'>
        <form
          onSubmit={handleSubmit}
          className='bg-[#fffcfc] min-w-96 p-8 rounded-3xl md:max-w-[638px] md:p-9 lg:w-[638px] lg:py-[40px] lg:px-[96px] md:mx-auto grid gap-6'
        >
          {/* heading */}
          <div>
            <div className='flex justify-between items-center'>
              <h1 className='text-xl md:text-3xl font-bold text-primary'>
                Welcome Back!
              </h1>
              <Link
                to={"/"}
                className='flex text-text-muted hover:text-primary transition'
              >
                <MdArrowBack className='text-2xl' />
                <span>Home</span>
              </Link>
            </div>
            <h2 className='text-sm md:text-lg font-semibold text-text-black mt-1 mb-4'>
              Login to continue
            </h2>
          </div>

          {/* input fields */}
          <div className='grid gap-5'>
            <TextField
              label='Email'
              variant='outlined'
              className='w-full'
              name='email'
              value={loginDetails.email}
              onChange={loginDetailsHandler}
            />
            <p className='text-red-400 text-xs'>{errors && errors.email}</p>
            <TextField
              label='Password'
              type='password'
              variant='outlined'
              className='w-full'
              name='password'
              value={loginDetails.password}
              onChange={loginDetailsHandler}
            />
            <p className='text-red-400 text-xs'>{errors && errors.password}</p>
          </div>

          {/* remember and forget password */}
          <div className='text-[#7C7C7C] text-sm flex justify-between items-center font-medium'>
            <div className='flex items-center gap-3'>
              <input type='checkbox' id='remember' name='remember' />
              <label htmlFor='remember'>Remember me</label>
            </div>
            <Link className='hover:text-primary transition'>
              Forgot Password?
            </Link>
          </div>

          {/* button */}
          <div className='grid'>
            <PrimaryButton btnText='Login Now' />
          </div>
          <p className='text-text-black text-sm font-medium flex justify-center'>
            Or Login With
          </p>

          <div className='grid'>
            <ButtonWithIcon
              icon={<FcGoogle />}
              btnText='Google'
              onClick={handleGoogleLogin}
            />
          </div>
          <p className='text-sm font-medium'>
            Don't have an account?{" "}
            <span className='text-primary underline hover:text-light-primary transition'>
              <Link to='/register'>Sign Up</Link>
            </span>
          </p>
        </form>
      </div>
    </FloatingBlobs>
  );
};

export default Login;
