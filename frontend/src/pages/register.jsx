import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingBlobs from "../components/FloatingBlobs";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { MdArrowBack } from "react-icons/md";
import ButtonWithIcon from "@/components/buttons/ButtonWithIcon";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { clearMessages, registerUser } from "@/slices/auth.slice";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    cPassword: "",
    role: "USER",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
    cPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);

  const handleshowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleshowCpassword = () => {
    setShowCpassword((prev) => !prev);
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newErrors = {};
      const { email, phone, password, cPassword } = formData;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) newErrors.email = "This field is required.";
      else if (!emailRegex.test(email))
        newErrors.email = "Invalid email format: E.g: example@example.com";

      if (!phone) newErrors.phone = "This field is required.";
      else if (phone.length !== 10)
        newErrors.phone = "Phone number must be 10 digits long.";

      if (!password) {
        newErrors.password = "This field is required.";
        console.log(password, "pass");
      } else if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
        console.log(password, "password");
      }

      if (!cPassword) newErrors.cPassword = "This field is required.";
      else if (cPassword.length < 8)
        newErrors.cPassword = "Password must be at least 8 characters long";
      else if (password !== cPassword)
        newErrors.password = "Passwords do not match";

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) return;

      setErrors({});

      dispatch(
        registerUser({
          email,
          phone,
          password,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
      navigate("/login");
    }

    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [successMessage, error, navigate, dispatch]);
  return (
    <FloatingBlobs>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div className='p-4 min-h-dvh flex items-center justify-center'>
          <div className='bg-[#fffcfc] min-w-96 p-8 rounded-3xl md:max-w-[638px] md:p-9 lg:w-[638px] lg:py-[40px] lg:px-[96px] md:mx-auto'>
            <div>
              <div className='flex justify-between items-center'>
                <h1 className='text-xl md:text-3xl font-bold text-primary'>
                  Create Account
                </h1>
                <Link
                  to={"/login"}
                  className='flex text-text-muted hover:text-primary transition'
                >
                  <MdArrowBack className='text-2xl' />
                  <span>Home</span>
                </Link>
              </div>
              <h2 className='text-sm md:text-lg font-semibold text-text-black mt-1 mb-4'>
                Create an account to continue
              </h2>
            </div>
            <form onSubmit={handleSubmit} className='grid gap-6'>
              {/* Name Fields */}
              <div>
                <TextField
                  label='Email'
                  variant='outlined'
                  className='w-full'
                  name='email'
                  value={formData.email}
                  onChange={handleFormData}
                />
                <p className='text-red-400 text-xs'>{errors && errors.email}</p>
              </div>
              {/* <div>
                <TextField
                  label='Phone number'
                  variant='outlined'
                  className='w-full'
                  name='phone'
                  value={formData.phone}
                  onChange={handleFormData}
                />
                <p className='text-red-400 text-xs'>{errors && errors.phone}</p>
              </div> */}
              {/* Password Field */}
              <div>
                <FormControl variant='outlined' className='w-full'>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <OutlinedInput
                    id='password'
                    type={showPassword ? "text" : "password"}
                    name='password'
                    className='w-full'
                    onChange={handleFormData}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleshowPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                </FormControl>
                <p className='text-red-400 text-xs'>
                  {errors && errors.password}
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <FormControl
                  variant='outlined'
                  className='w-full'
                  // sx={{ marginTop: "24px" }}
                >
                  <InputLabel htmlFor='cPassword'>Confirm Password</InputLabel>
                  <OutlinedInput
                    id='cPassword'
                    type={showCpassword ? "text" : "password"}
                    name='cPassword'
                    onChange={handleFormData}
                    className='w-full'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleshowCpassword}
                          edge='end'
                        >
                          {showCpassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Confirm Password'
                  />
                </FormControl>
                <p className='text-red-400 text-xs'>
                  {errors && errors.cPassword}
                </p>
              </div>

              {/* Create Account Button */}
              <div className='grid'>
                <PrimaryButton btnText='Create Account' type='submit' />
              </div>
            </form>
            <div className='grid gap-6'>
              <p className='text-text-black text-sm font-medium flex justify-center mt-6'>
                Or Continue With
              </p>

              <div className='grid'>
                <ButtonWithIcon
                  icon={<FcGoogle />}
                  btnText='Google'
                  onClick={handleGoogleRegister}
                />
              </div>
              <p className='text-sm font-medium'>
                Already have an account?{" "}
                <span className='text-primary underline hover:text-light-primary transition'>
                  <Link to='/login'>Sign In</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </FloatingBlobs>
  );
};

export default Register;
