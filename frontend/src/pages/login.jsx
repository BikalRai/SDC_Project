import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import FloatingBlobs from "../components/FloatingBlobs";
import { TextField } from "@mui/material";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ButtonWithIcon from "@/components/buttons/ButtonWithIcon";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration attempt:", { email, password });
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
            <h1 className='text-xl md:text-3xl lg:text-[40px] font-bold text-primary'>
              Welcome Back!
            </h1>
            <h2 className='text-sm md:text-lg lg:text-xl font-semibold text-text-black mt-1 mb-4'>
              Login to continue
            </h2>
          </div>

          {/* input fields */}
          <div className='grid gap-5'>
            <TextField
              label='Email'
              variant='outlined'
              className='w-full'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label='Password'
              type='password'
              variant='outlined'
              className='w-full'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* remember and forget password */}
          <div className='text-[#7C7C7C] text-sm flex justify-between items-center font-medium'>
            <div className='flex items-center gap-3'>
              <input type='checkbox' />
              <span>Remember me</span>
            </div>
            <Link>Forgot Password?</Link>
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
              <Link>Sign Up</Link>
            </span>
          </p>
        </form>
      </div>
    </FloatingBlobs>
  );
};

export default Login;
